import { toast } from "sonner";
import { useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

    useEffect(() => {
        const createToken = async () => {
            try {
                const viwerToken = await createViewerToken(hostIdentity);
                setToken(viwerToken);

                const decodedToken = jwtDecode(viwerToken) as JwtPayload & {
                    name?: string;
                };

                const nameD = decodedToken?.name;
                const identityD = decodedToken?.sub;
                // in video he used jti instead of sub

                if (identityD) {
                    setIdentity(identityD);
                }
                if (nameD) {
                    setName(nameD);
                }
            } catch {
                toast.error("Something went wrong");
            }
        };

        createToken();
    }, [hostIdentity]);

    return { token, name, identity };
};
