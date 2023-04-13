import classNames from 'classnames';
import { Image } from '../Image/Image';
import { useAppTranslation } from 'src/hooks/useAppTranslation';

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

export const AddImage: React.FC<Props> = ({ className }) => {

    const { t: trans } = useAppTranslation()


    /*
     * Goal: read the file inserted to extract the image that will be displayed
     *
     */
    const showImage = (src: any, target: any) => {
        var fr = new FileReader;

        fr.onload = function () {
            target.src = fr.result;
        }
        fr.readAsDataURL(src.files[0]);
    }


    /*
     * Goal: display an image inserted by the user
     *
     */
    function putImage() {
        hideIcon();
        var target = document.getElementById("target")!! as HTMLImageElement;
        var src = document.getElementById("select_image");

        showImage(src, target);
    }


    function hideIcon() {
        var icon = document.getElementById("image-icon")!!;
        icon.style.display = "none";
        var img = document.getElementById("target")!! as HTMLImageElement;
        img.style.display = "block";
    }



    /*
     * Goal: display an image fetched by dragNdrop
     *
     */
    function dropImage(e: any) {

        hideIcon();
        var target = document.getElementById("target")!! as HTMLImageElement;

        var fr = new FileReader();

        fr.onload = function (event) {
            target.src = event.target!!.result as string;
        }

        fr.readAsDataURL(e.target.files[0]);
        e.preventDefault();
    }


    return (
        <div className="add-image">

            <i className="fa-regular fa-image fa-2xl choose-image" id="image-icon" />
            <Image id="target" className={classNames(
                className,
                "choose-image"
            )}
                onDrop={(event) => dropImage(event)}
            />

            <input type="file" id="select_image" className="disappear" title={trans("ADD_IMAGE.CLICK_DROP")}
                onChange={() => putImage()}
            />
        </div>

    );
};
