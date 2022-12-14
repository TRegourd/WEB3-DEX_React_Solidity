// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Permet d'ajouter directement les smarts contract d'openZeppelin, fonctionne avec d'autre contracts dans vos nodemodules,
// ou des contract dans votre dossier
import "./myAwesomeNFT_whitelist.sol";
import "./RewardToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract NFTStaking is Ownable, IERC721Receiver, ReentrancyGuard {
    RewardToken token;
    MyAwesomeNFT_witheList nft;

    constructor() {}

    function setRewardToken(RewardToken _token) public onlyOwner {
        token = _token;
    }

    function setNft(MyAwesomeNFT_witheList _nft) public onlyOwner {
        nft = _nft;
    }

    struct Staking {
        uint256 tokenID;
        uint256 stakingTime;
        address owner;
    }

    event Staked(uint256 tokenID, uint256 stakingTime, address indexed owner);
    event UnStaked(
        uint256 tokenID,
        uint256 unstakingTime,
        address indexed owner
    );
    event ClaimEarnings(uint256 value, address indexed owner);

    mapping(uint256 => Staking) public nftsStaked;
    uint256 public totalStaking;
    uint256 public rewardTime = 10 * 1 seconds;

    modifier onlyOwnerOf(uint256 _tokenID) {
        require(nft.ownerOf(_tokenID) == msg.sender, "Not the OWner");
        _;
    }

    modifier onlyStakerOf(uint256 _tokenID) {
        require(nftsStaked[_tokenID].owner == msg.sender, "Not the Staker");
        _;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 id,
        bytes calldata data
    ) external override returns (bytes4) {
        return bytes4(IERC721Receiver.onERC721Received.selector);
    }

    function stake(uint256 _tokenID) public nonReentrant onlyOwnerOf(_tokenID) {
        require(nftsStaked[_tokenID].stakingTime == 0, "Already staked");
        Staking memory newStaking = Staking(
            _tokenID,
            block.timestamp,
            msg.sender
        );
        nftsStaked[_tokenID] = newStaking;
        totalStaking++;
        emit Staked(_tokenID, block.timestamp, msg.sender);
        nft.safeTransferFrom(msg.sender, address(this), _tokenID);
    }

    function claim(uint256 _tokenID) public {
        _claim(_tokenID);
    }

    function claimAll() public {
        uint256[] memory stakedTokens = getStakedTokens();
        for (uint256 i = 0; i < stakedTokens.length; i++) {
            _claim(stakedTokens[i]);
        }
    }

    function unstake(uint256 _tokenID) public {
        _claim(_tokenID);
        _unStake(_tokenID);
    }

    function _claim(uint256 _tokenID)
        internal
        nonReentrant
        onlyStakerOf(_tokenID)
    {
        uint256 pendingRewards = ((block.timestamp -
            nftsStaked[_tokenID].stakingTime) *
            rewardTime *
            1 gwei) / 1 seconds;
        require(pendingRewards > 0, "Nothing to claim");
        nftsStaked[_tokenID].stakingTime = block.timestamp;
        token.mint(msg.sender, pendingRewards);
    }

    function _unStake(uint256 _tokenID)
        internal
        nonReentrant
        onlyStakerOf(_tokenID)
    {
        delete nftsStaked[_tokenID];
        totalStaking--;
        emit UnStaked(_tokenID, block.timestamp, msg.sender);
        nft.transferFrom(address(this), msg.sender, _tokenID);
    }

    function getPendingRewards(uint256 _tokenID)
        public
        view
        onlyStakerOf(_tokenID)
        returns (uint256)
    {
        return
            ((block.timestamp - nftsStaked[_tokenID].stakingTime) *
                rewardTime) / 1 seconds;
    }

    function getStakedTokens() public view returns (uint256[] memory) {
        uint256 totalSupply = nft.maxSupply();
        uint256[] memory arr = new uint256[](totalSupply);
        uint256 index = 0;

        for (uint256 i = 0; i < totalSupply; i++) {
            if (nftsStaked[i].owner == msg.sender) {
                arr[index] = i;
                index++;
            }
        }

        uint256[] memory tokens = new uint256[](index);

        for (uint256 i = 0; i < index; i++) {
            tokens[i] = arr[i];
        }
        return tokens;
    }
}
