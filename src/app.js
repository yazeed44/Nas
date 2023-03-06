const { create } = require("ipfs-http-client");

const ipfsClient = create("http://127.0.0.1:5001/api/v0");

const clientName = `User ${Math.ceil(Math.random() * 100)}`;

ipfsClient.pubsub.publish("nas-streaming", `${clientName} just joined`);

// TODO add webcam feed
ipfsClient.pubsub.subscribe("nas-streaming", (message) => {
  const msgString = new TextDecoder().decode(message.data);
  // TODO Add to HTML
  console.log(msgString);
});
