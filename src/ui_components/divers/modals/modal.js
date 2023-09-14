import ReactDOM from "react-dom";
import Title from "../labels/title";
import NavigationButton from "../navigations/bouton_navigation";
import HorizontalSeparator from "../separators/horizontal_separator";

export default function Modal({isOpen, onConfirmation, id, title, content, imgSrc, imgAlt}){

    if (!isOpen)
        return

    return ReactDOM.createPortal(
        <div id={id}
             className={"absolute top-0 z-50 " +
            "flex justify-center " +
            "h-screen w-full " +
            "bg-stone-500 bg-opacity-50"}>

            <div className={"relative self-center h-fit w-fit p-6 px-10 bg-white rounded-lg space-y-3"}>
                <div className={"flex space-x-3"}>
                    <img src={imgSrc} alt={imgAlt}/>
                    <Title content={title} underline={false} className={"self-center"}/>
                </div>
                <HorizontalSeparator horizontalMargin={""}/>
                <p className={"mt-3"}>{content}</p>
                <NavigationButton id={id + "-button"}
                                  content={"Confirmer"}
                                  onclick={() => onConfirmation()}
                                  className={"w-fit p-2 text-white bg-red-500 hover:bg-red-600 active:bg-red-800 rounded-md"}
                />

            </div>


        </div>
        ,
        document.getElementById("portal")
    );
}