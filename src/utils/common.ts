import { Media } from '../components/types';

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
