const {Keypair, PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL} = require("@solana/web3.js");

const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const privateKey = newPair._keypair.secretKey;

console.log('Public Key:');
console.log(publicKey);
console.log('\nPrivate Key: ');
console.log(privateKey);

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(privateKey);
        const walletBal = await connection.getBalance(new PublicKey(myWallet.publicKey));
        console.log(`\nWallet address = ${publicKey}`);
        console.log(`   Balance is: ${walletBal / LAMPORTS_PER_SOL} SOL\n`);
    } catch (er) {
        console.log(er);
    }
};

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(privateKey);
        console.log('======AIRDROPPING 2 SOL======');
        const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(myWallet.publicKey), 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature);

    } catch (er) {
        console.log(er);
    }
};

async function driver() {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driver().catch(console.log);