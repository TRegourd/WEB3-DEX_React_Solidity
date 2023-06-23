// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Permet d'ajouter directement les smarts contract d'openZeppelin, fonctionne avec d'autre contracts dans vos nodemodules,
// ou des contract dans votre dossier
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract MyAwesomeNFT is
    ERC721URIStorage,
    ERC721Enumerable,
    Ownable,
    Pausable,
    ReentrancyGuard
{
    // permet d'instancier un conteur d'openzeppelin
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter public _tokenIds;

    string private uri_default = "www.google.com";
    string private uri_base;

    uint256 public tokenPrice = 0.001 ether;
    uint256 public maxSupply = 10;

    mapping(address => uint256[]) public nftsToOwner;

    constructor() ERC721("CryptoCats", "CATS") {
        uri_base = "ipfs://QmTNStQBms8hKEULsJsHGGQq4Vy7HUh8cs6zxQZMUNLorY/";
    }

    //-------------------------------------------SETTERS PART----------------------------------------------------------

    /**
    * @dev change the baseUri for tokenURI function.
    If baseUri is '' the DefaultUri value is used.
    */
    function setBaseUri(string calldata _value) external onlyOwner {
        uri_base = _value;
    }

    /**
    * @dev The default Uri value if base uri is not set
    This value is used to display black card until the reveal
    */
    function setDefaultUri(string calldata _value) external onlyOwner {
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
        override(ERC721URIStorage, ERC721)
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

    //------------------------------------------ Minting -----------------------------------------------------

    function unitMint() external payable whenNotPaused nonReentrant {
        require(msg.value >= tokenPrice, "Not enough money sent");
        require(
            _tokenIds.current() + 1 <= maxSupply,
            "Not enough token remaining"
        );
        _tokenIds.increment();
        uint256 mintedTokenId = _tokenIds.current();
        nftsToOwner[msg.sender].push(mintedTokenId);
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
            nftsToOwner[msg.sender].push(mintedTokenId);
            _safeMint(msg.sender, mintedTokenId);
        }
    }

    // ------------------------------------------Getters -----------------------------------------------------

    function getAllNftsOfOwner() public view returns (uint256[] memory) {
        return nftsToOwner[msg.sender];
    }

    // ------------------------------------------Withdraw -----------------------------------------------------

    function withdrawMoney() public onlyOwner nonReentrant {
        payable(msg.sender).transfer(address(this).balance);
    }

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
