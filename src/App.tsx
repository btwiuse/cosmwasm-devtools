import "./App.css";
import { AccountList } from "./features/accounts/AccountList";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { ContractList } from "./features/accounts/ContractList";
import { Console } from "./features/console/Console";
import { Connection } from "./features/connection/Connection";
import { Configuration } from "./features/connection/Configuration";
import { Messages } from "./features/messages/Messages";
import { ExecuteOptions } from "./features/console/ExecuteOptions";
import { Header } from "./components/Header";
import { Donate } from "./features/accounts/Donate";
import { InstantiateOptions } from "./features/console/InstantiateOptions";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { AppLocations, changeAppLocation } from "./features/app/appSlice";
import { Menu } from "primereact/menu";
import { BechConverter } from "./features/tools/bechconverter";
import { MsgSigner } from "./features/tools/msgsigner";

setBasePath(
    "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.64/dist/"
);
function App() {
    const dispatch = useAppDispatch();
    const appLocation = useAppSelector((state) => state.appState.appLocation);

    const menuItems = [
        {
            label: "Menu",
            items: [
                {
                    label: "Contract Explorer",
                    icon: "pi pi-home",
                    command: () => {
                        dispatch(changeAppLocation(AppLocations.Home));
                    },
                    className:
                        appLocation === AppLocations.Home ? "bg-gray-100" : "",
                },
                {
                    label: "Bech Converter",
                    icon: "pi pi-arrow-right-arrow-left",
                    command: () => {
                        dispatch(changeAppLocation(AppLocations.BechConverter));
                    },
                    className:
                        appLocation === AppLocations.BechConverter
                            ? "bg-gray-100"
                            : "",
                },
                {
                    label: "Msg Sign & Verify",
                    icon: "pi pi-check-circle",
                    command: () => {
                        dispatch(changeAppLocation(AppLocations.MsgSignVerify));
                    },
                    className:
                        appLocation === AppLocations.MsgSignVerify
                            ? "bg-gray-100"
                            : "",
                },
            ],
        },
    ];

    return (
        <div className="main">
            <aside className="sidebar">
                <Header />
                <div className="border border-bottom py-2">
                    <AccountList />
                </div>
                <div className="sidebar-main flex-none">
                    <Menu model={menuItems} className="!w-full" />
                </div>
                <div className="sidebar-main grow">
                    <ContractList />
                </div>
                <div className="connection border border-top pt-2">
                    <Connection />
                </div>
            </aside>
            <section className="console">
                {appLocation === AppLocations.Home ? (
                    <Console />
                ) : appLocation === AppLocations.BechConverter ? (
                    <BechConverter />
                ) : appLocation === AppLocations.MsgSignVerify ? (
                    <MsgSigner />
                ) : (
                    <Console />
                )}
            </section>
            <Configuration />
            <Messages />
            <ExecuteOptions />
            <InstantiateOptions />
            <Donate />
        </div>
    );
}

export default App;
