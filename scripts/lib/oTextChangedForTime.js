function timeMask(chars) {
    const hours = [
        /[0-2]/,
        chars[0] == '2' ? /[0-3]/ : /[0-9]/
    ];
    const minutes = [/[0-5]/, /[0-9]/];
    return hours.concat(':').concat(minutes);
}

function oTextChangedForTime(mt, e) {
    const text = mt.text;
    let chars = text.substr(0, 5).split("");
    if (!e.insertedText || chars.length === 0 || chars[chars.length - 1] === ":")
        return;
    const maskers = timeMask(chars);
    //console.log("CHARS, ", chars, maskers, e);

    if (!maskers[chars.length - 1].test || !maskers[chars.length - 1].test(chars[chars.length - 1])) {
        chars.splice(chars.length - 1, 1);
    }
    if (chars.length === 2)
        chars.push(":");
    mt.text = chars.join("");
}

module.exports = oTextChangedForTime;
