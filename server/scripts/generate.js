const secp = require("ethereum-cryptography/secp256k1");
const { hexToBytes ,toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
/*
const privateKey = toHex(secp.secp256k1.utils.randomPrivateKey());

const publicKey = toHex(secp.secp256k1.getPublicKey(privateKey));


console.log('Private Key : ', privateKey);
console.log('Pubic Key : ', publicKey);
*/
/*
Private Key :  6e87e3c673b53a6e1ffecb29339b574904657a461e2c47908f0e90229e86a3d6  
Pubic Key :  032d5b2bd8c0a21395c5e8445d01206836cbda0db48d54f07463f35ebc74002b94  

Private Key :  ec5ca257b4cce1f0608afc91ce54776b1fe54b5b82ebca8c235db10741bed300
Pubic Key :  034e72700ea914c73c5bb670141f1795ed1d483d3c918c7dc91583c939ccda4c7b

Private Key :  69a5e6399076ac9e672e23f1f262d987b9aa5324924c9a426e11710d4c54fc45
Pubic Key :  034cb45924015c849bd2a8fde988713c20b4b988c6837f62f66e7915ddef29d254  

*/

function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);
    return hash;
  }
  
  function signMessage(msg, PRIVATE_KEY) {
    const hashedMessage = hashMessage(msg);
    const privateKeyBytes = hexToBytes(PRIVATE_KEY);
    const signedMessage = secp.sign(hashedMessage, privateKeyBytes);
    return signedMessage;
  }
  
  async function recoverKey(message, signature) {
    const hashedMessage = hashMessage(message);
    const recoveredKey = await secp.recoverPublicKey(hashedMessage, signature);
    return recoveredKey;
  }
  
  const amount = 50;
  const privkey = "6e87e3c673b53a6e1ffecb29339b574904657a461e2c47908f0e90229e86a3d6";
  const message = String(amount);
  const signature = signMessage(message, privkey);
  
  console.log('Signature:', toHex(signature));