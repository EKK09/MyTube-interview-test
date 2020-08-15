export const getTimeTextFromDuration = (duration: string): string => {
    // ex: PT2M32S P#DT#H#M#S
    let timeText: string = '';
    let hourText: string = '';
    let minuteText: string = '';
    let secondText: string = '';


    const hourMatcher: RegExpMatchArray | null = duration.match(/(?<=T)[0-9]+(?=H)/);
    const minuteMatcher: RegExpMatchArray | null = hourMatcher !== null? duration.match(/(?<=H)[0-9]+(?=M)/): duration.match(/(?<=T)[0-9]+(?=M)/);
    const secondMatcher: RegExpMatchArray | null = duration.match(/(?<=M)[0-9]+(?=S)/);

    hourText = hourMatcher? hourMatcher[0]: '';


    if (hourText === '') {
        minuteText = minuteMatcher? minuteMatcher[0]: '';
        timeText += `${minuteText}:`;
    } else {
        minuteText = minuteMatcher? getTwoDigitNumber(Number(minuteMatcher[0])): '';
        timeText += `${hourText}:${minuteText}:`;
    }

    secondText = secondMatcher? getTwoDigitNumber(Number(secondMatcher[0])): '';
    timeText += secondText;

    return timeText;
};

export const getTwoDigitNumber = (number: number): string  => {
    if (number > 9) {
        return number.toString();
    }

    return `0${number.toString()}`;
};