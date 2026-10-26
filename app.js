const contractAddress = "0xdDaCeBB0D8D5fB0DDf6dc4f5b3F93f85d1f76422";

const contractABI = [
    { "inputs": [], "name": "checkBlance", "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }
];

let provider, signer, bankContract;

function showNotification(message, type = 'info') {
    const notifyElem = document.getElementById("notification");
    notifyElem.className = `notification show ${type}`;
    notifyElem.innerText = message;
}

// 1. เชื่อมต่อ MetaMask
document.getElementById("connectWalletBtn").addEventListener("click", async () => {
    if (typeof window.ethereum !== "undefined") {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            const address = await signer.getAddress();

            const walletElem = document.getElementById("walletAddress");
            walletElem.innerText = `เชื่อมต่อแล้ว: ${address.substring(0, 6)}...${address.substring(38)}`;
            walletElem.className = "status success";

            bankContract = new ethers.Contract(contractAddress, contractABI, signer);
            showNotification("🦊 เชื่อมต่อกระเป๋า MetaMask สำเร็จ!", "success");

            // ดึงยอดเงินให้อัตโนมัติหลังเชื่อมต่อกระเป๋า
            document.getElementById("checkBalanceBtn").click();
        } catch (error) {
            console.error(error);
            showNotification("❌ เชื่อมต่อกระเป๋าไม่สำเร็จ หรือผู้ใช้ยกเลิกรายการ", "error");
        }
    } else {
        showNotification("⚠️ ไม่พบ MetaMask กรุณาติดตั้งส่วนขยายบนเบราว์เซอร์", "error");
    }
});

// 2. เช็คยอดเงิน
document.getElementById("checkBalanceBtn").addEventListener("click", async () => {
    if (!bankContract) return showNotification("⚠️ กรุณากดเชื่อมต่อ MetaMask ก่อนทำรายการ", "error");
    try {
        showNotification("⏳ กำลังดึงข้อมูลยอดเงิน...", "info");
        const balanceWei = await bankContract.checkBlance();
        const balanceEth = ethers.utils.formatEther(balanceWei);
        
        // ตัดทศนิยมเหลือ 4 ตำแหน่งให้อ่านง่าย
        const formattedEth = parseFloat(balanceEth).toFixed(4);
        document.getElementById("balanceDisplay").innerText = `${formattedEth} ETH`;
        showNotification("✅ อัปเดตยอดเงินเรียบร้อยแล้ว", "success");
    } catch (err) {
        showNotification("❌ ดึงยอดเงินไม่สำเร็จ: " + (err.reason || err.message), "error");
    }
});

// 3. ฝากเงิน
document.getElementById("depositBtn").addEventListener("click", async () => {
    if (!bankContract) return showNotification("⚠️ กรุณากดเชื่อมต่อ MetaMask ก่อนทำรายการ", "error");
    try {
        const ethValue = document.getElementById("depositAmount").value;
        if (!ethValue || ethValue <= 0) return showNotification("⚠️ กรุณากรอกจำนวน ETH ให้ถูกต้อง", "error");

        const weiValue = ethers.utils.parseEther(ethValue);
        showNotification("⏳ กำลังส่งรายการฝากเงิน... กรุณายืนยันใน MetaMask", "info");
        
        const tx = await bankContract.deposit({ value: weiValue });
        showNotification("⏳ รอยืนยันธุรกรรมบน Blockchain...", "info");
        await tx.wait();

        showNotification(`🎉 ฝากเงินสำเร็จจำนวน ${ethValue} ETH!`, "success");
        document.getElementById("depositAmount").value = "";
        
        // อัปเดตยอดเงินอัตโนมัติ
        document.getElementById("checkBalanceBtn").click();
    } catch (err) {
        showNotification("❌ ฝากเงินไม่สำเร็จ: " + (err.reason || "รายการถูกยกเลิก"), "error");
    }
});

// 4. ถอนเงิน
document.getElementById("withdrawBtn").addEventListener("click", async () => {
    if (!bankContract) return showNotification("⚠️ กรุณากดเชื่อมต่อ MetaMask ก่อนทำรายการ", "error");
    try {
        const ethValue = document.getElementById("withdrawAmount").value;
        if (!ethValue || ethValue <= 0) return showNotification("⚠️ กรุณากรอกจำนวน ETH ให้ถูกต้อง", "error");

        const weiValue = ethers.utils.parseEther(ethValue);
        showNotification("⏳ กำลังส่งรายการถอนเงิน... กรุณายืนยันใน MetaMask", "info");

        const tx = await bankContract.withdraw(weiValue);
        showNotification("⏳ รอยืนยันธุรกรรมบน Blockchain...", "info");
        await tx.wait();

        showNotification(`🎉 ถอนเงินสำเร็จจำนวน ${ethValue} ETH!`, "success");
        document.getElementById("withdrawAmount").value = "";

        // อัปเดตยอดเงินอัตโนมัติ
        document.getElementById("checkBalanceBtn").click();
    } catch (err) {
        showNotification("❌ ถอนเงินไม่สำเร็จ: " + (err.reason || "ยอดเงินไม่พอ หรือรายการถูกยกเลิก"), "error");
    }
});