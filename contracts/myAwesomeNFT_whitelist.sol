// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyAwesomeNFT_witheList is
    ERC721URIStorage,
    ERC721Enumerable,
    Ownable,
    Pausable,
    ReentrancyGuard
{
    // permet d'instancier un conteur d'openzeppelin
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIds;
    mapping(address => bool) public claimedWhiteListNFTs;

    bytes32 private root;

    string private uri_default = "https://testnets.opensea.io/fr";
    string private uri_base = "";

    uint256 public tokenPrice = 0.001 ether;
    uint256 public maxSupply = 100;

    constructor(bytes32 _merkleroot) ERC721("CryptoCats", "CATS") {
        root = _merkleroot;
    }

    //-------------------------------------------SETTERS PART----------------------------------------------------------

    /**
    * @dev change the baseUri for tokenURI function.
    If baseUri is '' the DefaultUri value is used.
    */
    function setBaseUri(string memory _value) external onlyOwner {
        uri_base = _value;
    }

    /**
    * @dev The default Uri value if base uri is not set
    This value is used to display black card until the reveal
    */
    function setDefaultUri(string memory _value) external onlyOwner {
        uri_default = _value;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    //------------------------------------------ URIs -----------------------------------------------------

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(_exists(tokenId));
        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length != 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : uri_default;
    }

    function _baseURI() internal view override returns (string memory) {
        return uri_base;
    }

    //------------------------------------------ MerkleTree -----------------------------------------------------

    function updateWhiteList(bytes32 _merkleroot) public onlyOwner {
        root = _merkleroot;
    }

    function isWhiteListed(address _account, bytes32[] memory _proof)
        internal
        view
        returns (bool)
    {
        bytes32 leaf = keccak256(abi.encodePacked(_account));
        return MerkleProof.verify(_proof, root, leaf);
    }

    //------------------------------------------ Minting -----------------------------------------------------

    function whitheListMint(bytes32[] memory _proof)
        external
        payable
        whenNotPaused
        nonReentrant
    {
        require(isWhiteListed(msg.sender, _proof), "Not on the whitelist");
        require(!claimedWhiteListNFTs[msg.sender], "Already claimed");
        require(
            _tokenIds.current() + 1 <= maxSupply,
            "Not enough token remaining"
        );
        _tokenIds.increment();
        uint256 mintedTokenId = _tokenIds.current();
        claimedWhiteListNFTs[msg.sender] = true;
        _safeMint(msg.sender, mintedTokenId);
    }

    function unitMint() external payable whenNotPaused nonReentrant {
        require(msg.value >= tokenPrice, "Not enough money sent");
        require(
            _tokenIds.current() + 1 <= maxSupply,
            "Not enough token remaining"
        );
        _tokenIds.increment();
        uint256 mintedTokenId = _tokenIds.current();

        _safeMint(msg.sender, mintedTokenId);
    }

    function multipleMint(uint256 _amount)
        external
        payable
        whenNotPaused
        nonReentrant
    {
        require(msg.value >= tokenPrice * _amount, "Not enough money sent");
        require(
            _tokenIds.current() + _amount <= maxSupply,
            "Not enough token remaining"
        );
        for (uint256 i = 0; i < _amount; i++) {
            _tokenIds.increment();
            uint256 mintedTokenId = _tokenIds.current();
            _safeMint(msg.sender, mintedTokenId);
        }
    }

    // ------------------------------------------Withdraw -----------------------------------------------------

    function withdrawMoney() public onlyOwner nonReentrant {
        payable(msg.sender).transfer(address(this).balance);
    }

    //------------------------------------------ Overrides -----------------------------------------------------

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
