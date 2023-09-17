import {useLayoutEffect, useState} from "react";
import project16 from "../../resources/project/project16.png";
import project32 from "../../resources/project/project32.png";
import project64 from "../../resources/project/project64.png";
import user_story16 from "../../resources/user_story/user_story16.png";
import user_story32 from "../../resources/user_story/user_story32.png";
import user_story64 from "../../resources/user_story/user_story64.png";
import suggestion_dark16 from "../../resources/suggestion/suggestion_dark16.png";
import suggestion_dark32 from "../../resources/suggestion/suggestion_dark32.png";
import suggestion_dark64 from "../../resources/suggestion/suggestion_dark64.png";
import error16 from "../../resources/error/error16.png";
import error32 from "../../resources/error/error32.png";
import error64 from "../../resources/error/error64.png";
import admin_users16 from "../../resources/admin_users/admin_users16.png";
import admin_users32 from "../../resources/admin_users/admin_users32.png";
import admin_users64 from "../../resources/admin_users/admin_users64.png";
import settings16 from "../../resources/settings/settings16.png";
import settings32 from "../../resources/settings/settings32.png";
import settings64 from "../../resources/settings/settings64.png";
import user16 from "../../resources/user/user16.png";
import user32 from "../../resources/user/user32.png";
import user64 from "../../resources/user/user64.png";
import user96 from "../../resources/user/user96.png";
import plus_dark16 from "../../resources/plus/plus_dark16.png";
import plus_dark32 from "../../resources/plus/plus_dark32.png";
import plus_dark64 from "../../resources/plus/plus_dark64.png";
import plus_bright16 from "../../resources/plus/plus_bright16.png";
import plus_bright32 from "../../resources/plus/plus_bright32.png";
import plus_bright64 from "../../resources/plus/plus_bright64.png";
import refresh16 from "../../resources/refresh/refresh16.png";
import refresh32 from "../../resources/refresh/refresh32.png";
import refresh64 from "../../resources/refresh/refresh64.png";
import trash64 from "../../resources/trash/trash64.png";
import trash32 from "../../resources/trash/trash32.png";
import trash16 from "../../resources/trash/trash16.png";
import pen64 from "../../resources/pen/pen64.png";
import pen32 from "../../resources/pen/pen32.png";
import pen16 from "../../resources/pen/pen16.png";
import back_arrow_bright64 from "../../resources/back_arrow/back_arrow_bright64.png";
import back_arrow_bright32 from "../../resources/back_arrow/back_arrow_bright32.png";
import back_arrow_bright16 from "../../resources/back_arrow/back_arrow_bright16.png";
import back_arrow_dark64 from "../../resources/back_arrow/back_arrow_dark64.png";
import back_arrow_dark32 from "../../resources/back_arrow/back_arrow_dark32.png";
import back_arrow_dark16 from "../../resources/back_arrow/back_arrow_dark16.png";
import forward_arrow64 from "../../resources/forward_arrow/forward_arrow64.png";
import forward_arrow32 from "../../resources/forward_arrow/forward_arrow32.png";
import forward_arrow16 from "../../resources/forward_arrow/forward_arrow16.png";
import arrow_right64 from "../../resources/arrow-right/arrow_right64.png";
import arrow_right32 from "../../resources/arrow-right/arrow_right32.png";
import arrow_right16 from "../../resources/arrow-right/arrow_right16.png";
import home_dark16 from "../../resources/home/home_dark16.png";
import home_dark32 from "../../resources/home/home_dark32.png";
import home_dark64 from "../../resources/home/home_dark64.png";
import home_bright16 from "../../resources/home/home_bright16.png";
import home_bright32 from "../../resources/home/home_bright32.png";
import home_bright64 from "../../resources/home/home_bright64.png";
import home16 from "../../resources/home/home16.png";
import home32 from "../../resources/home/home32.png";
import home64 from "../../resources/home/home64.png";
import visualize_dark16 from "../../resources/visualize/visualize_dark16.png";
import visualize_dark32 from "../../resources/visualize/visualize_dark32.png";
import visualize_dark64 from "../../resources/visualize/visualize_dark64.png";
import starters16 from "../../resources/starters/starters16.png";
import starters32 from "../../resources/starters/starters32.png";
import starters64 from "../../resources/starters/starters64.png";
import dishes16 from "../../resources/dishes/dishes16.png";
import dishes32 from "../../resources/dishes/dishes32.png";
import dishes64 from "../../resources/dishes/dishes64.png";
import desserts16 from "../../resources/desserts/desserts16.png";
import desserts32 from "../../resources/desserts/desserts32.png";
import desserts64 from "../../resources/desserts/desserts64.png";
import beverages16 from "../../resources/beverages/beverages16.png";
import beverages32 from "../../resources/beverages/beverages32.png";
import beverages64 from "../../resources/beverages/beverages64.png";

const images = {
    project16,
    project32,
    project64,
    user_story16,
    user_story32,
    user_story64,
    suggestion_dark16,
    suggestion_dark32,
    suggestion_dark64,
    error16,
    error32,
    error64,
    admin_users16,
    admin_users32,
    admin_users64,
    settings16,
    settings32,
    settings64,
    user16,
    user32,
    user64,
    user96,
    plus_dark16,
    plus_dark32,
    plus_dark64,
    plus_bright16,
    plus_bright32,
    plus_bright64,
    refresh16,
    refresh32,
    refresh64,
    trash64,
    trash32,
    trash16,
    pen64,
    pen32,
    pen16,
    back_arrow_dark64,
    back_arrow_dark32,
    back_arrow_dark16,
    back_arrow_bright64,
    back_arrow_bright32,
    back_arrow_bright16,
    forward_arrow64,
    forward_arrow32,
    forward_arrow16,
    arrow_right64,
    arrow_right32,
    arrow_right16,
    home_dark16,
    home_dark32,
    home_dark64,
    home_bright16,
    home_bright32,
    home_bright64,
    home16,
    home32,
    home64,
    visualize_dark16,
    visualize_dark32,
    visualize_dark64,
    starters16,
    starters32,
    starters64,
    dishes16,
    dishes32,
    dishes64,
    desserts16,
    desserts32,
    desserts64,
    beverages16,
    beverages32,
    beverages64,
};

/**
 * Retourne une image correspondant aux paramètres.
 * Nécessite d'avoir déjà ajouté les images au tableau images[] dans cette fonction
 * @param imgName String : Nom de l'image
 * @param format Int : Format de l'image voulu
 * @returns {*} String : Chemin vers l'image désirée
 */
export default function GetImgByFormat(imgName, format){
    return images[imgName+format];
}

/**
 * Récupération de l'image au formatters correspondant à la taille de la fenêtre (exemple avec le Logo)
 * @param imgName String : nom de l'image
 * @param formatByDefault Int : formatters à retourner par défaut (si vide, retourne l'image sans formatters prédéfini)
 * @returns {*} String : chemin menant à l'image.
 */
export function GetImgByWindowSize(imgName, formatByDefault){
    const [width] = useWindowsSize();

    return !width || width <= 640 ? images[imgName + "16"]
        : width <= 1024 ? images[imgName + "32"]
        : images[imgName + formatByDefault];
}

/**
 * Controller des dimensions de la fenêtre du navigateur
 * @returns {number[]} Array[int, int] : Dimensions de la fenêtre du navigateur
 */
export function useWindowsSize(){
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize(){
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
