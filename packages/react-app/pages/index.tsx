
import HomeBody from "@/components/HomeBody";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import OnBoarding from "./onboarding";
import MetaMaskConnect from "@/components/MetaMaskConnect";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';
import UserHome from "./user";
import MerchantHome from "./merchant";

export default function Home() {
    const account = useAccount();
    const [userAddress, setUserAddress] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const { address, isConnected } = useAccount();
    const { data, isError, isSuccess, isLoading } = useReadContract({
        abi: contractABI.abi,
        address: "0x536c3Fe8613d2648F2B3ac6c9B45Ea6C1EfB6611",
        account: account.address,
        functionName: "getUser",
    })

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isConnected && address) {
            setUserAddress(address);
        }
    }, [address, isConnected]);

    if (!isMounted) {
        return null;
    }



    // const renderBody = (): ReactNode => {

    //     if (userData[0] == true && userData[1]) {
    //         var connectedComponent: JSX.Element = <MerchantHome />

    //     } else if (userData[0] && !userData[1]) {
    //         var connectedComponent: JSX.Element = <UserHome />
    //     } else {
    //         var connectedComponent: JSX.Element = <OnBoarding />
    //     }

    //     return connectedComponent;
    // }


    if (isSuccess) {
        const userData: Array<any> = data as Array<any>;
        console.log(userData);

        return (
            <div className="flex flex-col justify-center items-center w-screen min-h-screen">

                {isConnected ?
                    Boolean(userData[0]).valueOf() ? (Boolean(userData[1]).valueOf() ? <MerchantHome /> : <UserHome />) : <OnBoarding />
                    : (
                        <MetaMaskConnect />
                    )}
            </div>
        );
        return <></>
    } else if (isLoading) {
        return (<span className="loading loading-dots loading-md"></span>);
    } else if (isError) {
        return <p className="text-red-600 font-semibold text-xl">Internal Server Error. Please try again.</p>
    } else {
        return (<span className="loading loading-dots loading-md"></span>);
    }

}
