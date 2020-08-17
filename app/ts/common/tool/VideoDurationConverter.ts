export const getTimeTextFromDuration = (duration: string): string => {
    // ex: PT2M32S P#DT#H#M#S
    // TODO: 暫時不考慮長度超過一天的影片
    let timeText: string = '';

    const TIndex: number = duration.indexOf('T');

    if (TIndex === -1) {
        return '00:00';
    }
    // 00H00M00S
    timeText = duration.slice(TIndex + 1);
    timeText = timeText.replace('H', ':');
    timeText = timeText.replace('M', ':');
    timeText = timeText.replace('S', '');

    return timeText;
};

export const getTwoDigitNumber = (number: number): string  => {
    if (number > 9) {
        return number.toString();
    }

    return `0${number.toString()}`;
};