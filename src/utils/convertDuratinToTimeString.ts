export function convertDurationToTimeString(duration: number){
    const hours = Math.floor(duration / (3600));
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const timeString = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        // .padStart(2, '0'))  || para sempre ter 2 digitos || acresceta o 0 se n tiver
        .join(':')

        return timeString;

    }