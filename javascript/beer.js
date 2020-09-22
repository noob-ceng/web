const drink = function(total, bottle = 0, lid = 0) {
    if (total > 0 || bottle >= 3 || lid >= 5) {
        let newBottle = total + bottle;
        let newLid = total + lid;
        let gift = parseInt(newBottle / 3) + parseInt(newLid / 5);
        return total + drink(gift, newBottle % 3, newLid % 5);
    } else return 0;
}

console.log(drink(100));
