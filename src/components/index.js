const num = 10;
const arr = [
    {
       name: "6",
        weight: -7
    },
    {
        name: "5",
        weight: 0
    },
    {
        name: "1",
        weight: 10
    },
    {
        name: "4",
        weight: 40
    },
    {
        name: "2",
        weight: 20
    },
    {
        name: "3",
        weight: 30
    }
];

const newarr = arr.sort((a, b) => a.weight - b.weight);
const str = newarr.find((item, index) =>  {
   return num < item.weight || index === newarr.length - 1 || (num >= item.weight && num < newarr[index + 1].weight)
});

console.log(str);