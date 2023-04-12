import { SlButton, SlButtonGroup } from "@shoelace-style/shoelace/dist/react";

import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Tooltip } from "primereact/tooltip";
import { useEffect, useState } from "react";
import styles from "../console/Input.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AppThunk } from "../../app/store";
import { sign, verify } from "./signingSlice";

export const MsgSigner = () => {
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState("");
    const [address, setAddress] = useState("");
    const [signature, setSignature] = useState("");
    const signedMsg = useAppSelector((state) => state.signing.signedMsg);
    const output = useAppSelector((state) => state.signing.output);

    const currentAccount = useAppSelector(
        (state) => state.accounts.currentAccount
    );

    function run(action: AppThunk<void>) {
        dispatch(action);
    }

    useEffect(() => {
        if (signedMsg && signedMsg.address && signedMsg.signature) {
            setAddress(signedMsg.address);
            setSignature(signedMsg.signature);

            if (signedMsg.msg && message && signedMsg.msg !== message) {
                setMessage(signedMsg.msg);
            }
        }
    }, [message, signedMsg]);

    const runSignMsg = () => {
        run(sign(message));
    };

    const runVerifyMsg = () => {
        run(verify(message, address, signature));
    };

    return (
        <div className="py-2 px-4 flex flex-col h-full">
            <div className="flex-none">
                <p className="text-lg">Message Sign & Verify</p>
                <Divider />
                <div className="flex-auto">
                    <label htmlFor="msgToSign" className="font-bold block mb-2">
                        Message
                    </label>
                    <div className="w-1/2">
                        <InputTextarea
                            id="msgToSign"
                            placeholder="I solemnly swear that I am up to no good."
                            className="w-full h-64"
                            value={message}
                            onInput={(e) =>
                                setMessage((e.target as HTMLInputElement).value)
                            }
                        />
                    </div>
                </div>
                <div className="flex-auto pt-4">
                    <div className="w-1/2">
                        <label
                            htmlFor="signingAddress"
                            className="font-bold block mb-2"
                        >
                            Signing Address
                        </label>
                        <InputText
                            id="signingAddress"
                            placeholder="juno1aeh8gqu9wr4u8ev6edlgfq03rcy6v5twfn0ja8?"
                            className="w-full"
                            value={address}
                            onInput={(e) =>
                                setAddress((e.target as HTMLInputElement).value)
                            }
                        />
                    </div>
                </div>
                <div className="flex-auto pt-4">
                    <div className="w-1/2">
                        <label
                            htmlFor="signature"
                            className="font-bold block mb-2"
                        >
                            Signature
                        </label>
                        <InputText
                            id="signature"
                            placeholder="a really long string goes here"
                            className="w-full"
                            value={signature}
                            onInput={(e) =>
                                setAddress((e.target as HTMLInputElement).value)
                            }
                        />
                    </div>
                </div>
                <div className={`${styles.controls} mt-8 flex-none`}>
                    <SlButtonGroup className={styles.buttons}>
                        <Tooltip target="#tt_id_1" />
                        <Tooltip target="#tt_id_2" />
                        <Tooltip target="#tt_id_3" />
                        <SlButton
                            id={"tt_id_1"}
                            data-pr-tooltip="Formats JSON in the editor"
                            data-pr-position="top"
                            onClick={() => {
                                if (currentAccount !== undefined) {
                                    runSignMsg();
                                }
                            }}
                            disabled={currentAccount === undefined}
                        >
                            Sign
                        </SlButton>
                        <SlButton
                            id={"tt_id_2"}
                            data-pr-tooltip="Formats JSON in the editor"
                            data-pr-position="top"
                            onClick={() => {
                                if (currentAccount !== undefined) {
                                    runVerifyMsg();
                                }
                            }}
                            disabled={currentAccount === undefined}
                        >
                            Verify
                        </SlButton>
                    </SlButtonGroup>
                </div>
                <Divider />
            </div>
            <div
                className={`${
                    signedMsg?.verified === true ? "bg-green-400" :
                    signedMsg?.verified === false ? "bg-red-300" :
                    "bg-gray-100"
                } grow rounded-lg p-2`}
            >
                <span>{output}</span>
            </div>
        </div>
    );
};
