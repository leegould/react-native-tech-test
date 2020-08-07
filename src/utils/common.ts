import { Media } from '../components/types';

/* TODO: this will make the search list very
 * slow as it grows, worst case will be doing
 * n (results) * n lg n (sort on media)
 * Could just return first image or fix in api
 * to return a sized mobile img.
 */
export function getImageFromMedia(media: Media[]) {
    let image;
    if (media.length > 0) {
        if (media.length > 1) {
            image = [...media]
                .filter((img) => {
                    return parseInt(img.width, 10) > 100;
                })
                .sort(
                    (a, b) => parseInt(a.width, 10) - parseInt(b.width, 10),
                )[0];
        } else {
            image = media[0];
        }
    }
    return image;
}

export function formatTime(timeStr: string) {
    return timeStr.replace('PT', '').replace('H', 'H ');
}
