export function averageXP(list){
    let sum = 0,
        count = 0,
        i;

    for (i = 0; i < list.length; i++) {

        sum += list[i].xp;
        ++count;

    }
    return sum / count
}
