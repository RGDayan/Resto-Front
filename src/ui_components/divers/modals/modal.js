import ReactDOM from "react-dom";
import Title from "../labels/title";
import NavigationButton from "../navigations/navigation_button";
import HorizontalSeparator from "../separators/horizontal_separator";

export default function Modal({isOpen, close, onConfirmation, id, title, content, imgSrc, imgAlt, children}){

    if (!isOpen)
        return

    return ReactDOM.createPortal(
        <div id={id}
             className={"absolute top-0 z-50 " +
            "flex justify-center " +
            "h-screen w-full " +
            "bg-stone-500 bg-opacity-50"}>

            <div className={"relative mt-28 h-fit w-fit p-6 px-10 bg-white rounded-lg space-y-3"}>
                <div className={" flex space-x-3"}>
                    {
                        imgSrc?
                            <img src={imgSrc} alt={imgAlt}/>
                            :""
                    }
                    <Title content={title} underline={false} className={"self-center"}/>
                    <NavigationButton id={"close-modal-" + id}
                                      content={"✕"}
                                      onClick={() => close()}
                                      className={"absolute top-2 right-3 rounded-full px-2.5"}/>

                </div>
                <HorizontalSeparator horizontalMargin={""}/>
                <p className={"mt-3"}>{content}</p>
                {children}
                <NavigationButton id={id + "-button"}
                                  content={"Confirmer"}
                                  onClick={() => {
                                      onConfirmation()
                                      close()
                                  }}
                                  className={"w-fit p-2 text-white bg-red-500 hover:bg-red-600 active:bg-red-800 rounded-md"}
                />

            </div>


        </div>
        ,
        document.getElementById("portal")
    );
}