**Current problem**
Streamers pay ~40% to Youtube for superchats and rely on centralized transcoding and distribution by these platforms. However, Streamers have no control over the transcoding quality or transcoding bitrate, and so the quality of their streams is out of their hands. Also, they are subject to strict rules and regulations about what content they can stream. For example, Youtube's new rule requires 'education, scientific research, news reporting, criticism, or commentary as the 'primary purpose of streaming. Streamers could get banned for their content, and will not get paid for their content.

**Proposal**

Nas (People in Arabic) is a serverless, adminless, decentralized live streaming platform with live comments functionality. The platform (Nas) will use livepeer (https://livepeer.org) for transcoding and distributing the live streams of streamers P2P. Livepeer playback id (which is used by viewers to stream) will be stored, as well as other metadata related to the stream in IPFS/IPNS. Users will comment on stream in real-time using gossipsub implementation in IPFS, which allows a message to reach all peers within a matter of milliseconds in a p2p manner. Additionally, streamers can monetize their channels in various ways, including requiring commentors to have NFTs to comment or a token. Nas platform will give streamers ownership of their content, as well, as their monetization. Streamers will receive 100% of their tip, in any token or chain they pick. This high interoperability will attract a lot of content creators who are creating their own tokens/NFTs and are looking for a usecase for them within their content.

**Value Proposition**
Own and monetize 100% of your content.

**Stakeholders**

- Content creators looking to monetize their content
- Artists looking to monetize their art
- Users who live in sanctioned countries that don't have access to big tech, youtube/twitch/twitter
- Web3 influencers who want to increase the value of their NFT by linking it to the platform

**How spam will be mitigated:**

- A P2P pubsub network is susceptible to spam attacks that would DDOS it. It is impossible for moderators to remove nearly infinite spam comments. We propose a solution where commenter request a captcha challenge from the channel peer. If a commenter relays too many captcha challenge requests without providing enough correct captcha challenge answers, they are blocked from the pubsub network. For this to work, the channel node has to broadcast the result of each challenge, and other peers in the network have to keep track of it through an internal reputation system.

The captcha implementation is arbitrary and is decided by the channel owner. A channel owner can ask commenter to submit a signature proof of having an NFT, or a token balance. They can also decide to permit all incoming comments on their streams.

**Content Discovery**
How will new users discover content? Nas will have a default feed that is curated by DAO members. The feed will be safe for all ages and countries. A user can also make their own feed by subscribing to new channels, similar to how Twitch operates.

**Token**
NasToken (on BNB L2 potentially) will be used as the default coin for tipping, although any coin be used to tipping, including the streamer's own coin, if they wish. The token is also a governance token, so it can be used to vote on proposals that affects the functionality of the platform. For example, you can vote on changing the default feed of the platform.

**Why BNB and its L2s is a good fit for token:**
To incentivize users to tip streamers, we need to use a blockchain with extremely low fees. BNB L1 is low, but we can use second layer on top of BNB to achieve even lower fees. Something like zkBNb should be perfect.

**Go-to-market strategy**

- Develop a MVP
- Reach out to marginalized groups who have banned by live streaming platform or can't access it at all. So for example countries sanctioned by US can't use Twitch due to geopolitical ban.
- Reach out to content creators on platforms that take a big cut out of creators' revenue
- Develop tools to simplify creating tokens and NFTs for non tech save creators
- Launch DAO that uses NasToken as governance

**Technical Details**

Steps to create a channel as a streamer:

- Download Nas app
- Create a channel
  - A channel is essentially an IPNS with metadata of the channel
    - It will be a json file similar with the following props
      - Title -> Title of the channel
      - Description -> Description of the channel
      - ThumbnailUrl -> Thumbnail of the channel
      - streams -> An array of metadata of streams that users can watch (Stream[])
      - challengeTypes -> This will the expected challenges of user to be able to comment in real time. Could be image captcha, or NFT or token balance.
        - Example, you can only comment on a specific stream/channel if you have an NFT from a specific collection
        - Another example, you can only comment if you have a token (ERC-20) balance of over a certain number
      - roles -> It will be a list of moderators and their authority (can they delete comments/videos/etc)
- Start a stream
  - Will call livepeer library to create a new live stream. The library will give us an ID that can be used for streaming
  - Nas then will create the metadata for a new Stream
    - title -> Title of the stream
    - Description -> Description of the stream
    - Stream ID -> The id that was given by livepeer. This is needed for streaming
  - This stream is then added to the channel streams array
- A streamer will then have an ipns address that they can share with the users
  - The ipns address is essentially just a hash of the public key of the channel
    - May not look good, and is harder to memorize
      - If the streamer wishes, they can use naming services such as ENS, handshake or even regular domains

User journey

- Download NAS app
- Watching stream
  - Retrieve the curated streamers feed from the DAO
  - Also retrieve their own feed streamers (ones they subscribed to)
  - Click on a channel
  - Download the metadata of the channel, which has all streams
  - Display all streams
  - Click on a stream
  - Load stream by using livepeer and ID from channel.streams field
- Commenting on a stream
  - Subscribe to the stream pubsub topic to receive messages from other peer
  - Publish challenge request
  - Receive challenge from streamer node
  - Solve challenge
  - Publish your challenge over pubsub
