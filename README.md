# 🏦 Bank DApp System (Ethereum Sepolia Testnet)

ระบบธนาคารจำลอง (Decentralized Application - DApp) ที่เชื่อมต่อการทำงานกับ Smart Contract บนเครือข่าย **Ethereum Sepolia Testnet** ผ่าน Web3 / MetaMask ช่วยให้ผู้ใช้สามารถตรวจสอบยอดเงิน ฝากเงิน และถอนเงินได้ผ่านหน้าเว็บอินเทอร์เฟซแบบเรียลไทม์

---

## 👨‍🎓 ข้อมูลผู้จัดทำ

* **รหัสนักศึกษา:** 66099934
* **ชื่อ-สกุล:** นายกิติศักดิ์ สุรพัฒน์ไพดิษฐ์
* **วิชา:** การพัฒนาสัญญาอัจฉริยะ (Smart Contract Development)

---

## 📄 ข้อมูล Smart Contract

* **Contract Address:** [`0xdDaCeBB0D8D5fB0DDf6dc4f5b3F93f85d1f76422`](https://sepolia.etherscan.io/address/0xdDaCeBB0D8D5fB0DDf6dc4f5b3F93f85d1f76422)
* **Network:** Ethereum Sepolia Testnet
* **Compiler Version:** Solidity `v0.8.20`
* **License:** MIT

---

## 🛠️ ฟังก์ชันการทำงานของระบบ (Features)

1. **🦊 Connect MetaMask:** เชื่อมต่อกระเป๋าเงินดิจิทัลของผู้ใช้ พร้อมแสดงสถานะและ Address ของผู้ใช้งาน
2. **💰 Check Balance:** ดึงข้อมูลยอดเงินคงเหลือในบัญชีธนาคาร (`checkBlance`) จาก Smart Contract พร้อมแสดงผลเป็นหน่วย ETH (ตัดทศนิยมให้อ่านง่าย)
3. **📥 Deposit:** ฝากเงินเหรียญ SepoliaETH เข้าสู่สัญญาอัจฉริยะ (`deposit`)
4. **📤 Withdraw:** ถอนเงินเหรียญ SepoliaETH ออกจากสัญญาอัจฉริยะเข้ากระเป๋าผู้ใช้ (`withdraw`) โดยระบบแปลงหน่วยจาก ETH เป็น Wei ให้อัตโนมัติ
5. **🔔 Notification Banner:** ระบบแจ้งเตือน UI แจ้งสถานะการทำรายการ (กำลังดำเนินการ / สำเร็จ / ผิดพลาด) บนหน้าเว็บโดยไม่ต้องใช้ Alert ป๊อปอัป

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
.
├── Bank.sol          # ไฟล์ Source Code ของ Smart Contract (Solidity)
├── index.html        # โครงสร้างหน้าเว็บ DApp Dashboard (HTML5)
├── style.css         # การตกแต่งสไตล์ UI (CSS3 - Grid Dashboard Layout)
├── app.js            # สคริปต์เชื่อมต่อ Web3 และ Smart Contract (Ethers.js)
└── README.md         # เอกสารอธิบายโปรเจกต์