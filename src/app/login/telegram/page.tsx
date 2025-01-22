"use client"
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useConnect } from "thirdweb/react";
import { client, wallet } from "@/app/constant";
import { Loader2 } from "lucide-react";
import Image from "next/image";

function TelegramLoginContent() {
    const searchParams = useSearchParams();
    const { connect } = useConnect();
    const router = useRouter();
    const [params, setParams] = useState({ signature: '', message: '' });
    useEffect(() => {
        const signature = searchParams.get('signature') || '';
        const message = searchParams.get('message') || '';
        if (signature && message) {
            localStorage.setItem('telegramAuth', JSON.stringify({ signature, message }));
        }
    }, [searchParams]);
    useEffect(() => {
        const signature = searchParams.get('signature') || '';
        const message = searchParams.get('message') || '';
        setParams({ signature, message });
        console.log('SearchParams:', { signature, message });
    }, [searchParams]);

    useQuery({
        queryKey: ["telegram-login", params.signature, params.message],
        queryFn: async () => {
            if (!params.signature || !params.message) {
                console.error('Missing signature or message');
                return false;
            }
            try {
                await connect(async () => {
                    await wallet.connect({
                        client,
                        strategy: "auth_endpoint",
                        payload: JSON.stringify({
                            signature: params.signature,
                            message: params.message,
                        }),
                        encryptionKey: process.env.NEXT_PUBLIC_AUTH_PHRASE as string,
                    });
                    router.replace("/gamepage");
                    return wallet;
                });
                return true;
            } catch (error) {
                console.error('Connection error:', error);
                return false;
            }
        },
        enabled: !!params.signature && !!params.message,
    });

    return (
        <div className="h-screen bg-black w-full flex items-center justify-center">
          <div className="font-bold font-zk text-white">Please wait...</div>
          </div>
    );
}


export default function BinanceLogin () {

  return (
   <>
   <Suspense fallback={
          <div className="h-screen bg-black w-full flex items-center justify-center">
            <div className="font-bold font-zk text-white">Please wait...</div>
          </div>
         }>
            <TelegramLoginContent />
        </Suspense>

   </>
  );
}