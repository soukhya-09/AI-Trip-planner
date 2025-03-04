export const data =[

    {
        id:1,
    budget:"Low",
    desc:"Stay conscious of cost",
    icon:"🪙🪙"
    },
    {
        id:2,
    budget:"Medium",
    desc:"Keep cost on average side",
    icon:"💰💰"
    },
    {
        id:3,
    budget:"High",
    desc:"Don't Worry about cost",
    icon:"💸💹"
    }

]


export const alongdata=[
    {
        id:1,
        people:"Family",
        desc:"Group of fun loving adventure"
        , icon:"👨‍👩‍👧‍👦"
    },
    {
        id:2,
        people:"Couple",
        desc:"Two travellers in tandem"
        , icon:"💞"
    },
    {
        id:3,
        people:"Just Me",
        desc:"Solo Trip"
        , icon:"👦"

    },
    {
        id:4,
        people:"Friends",
        desc:"Bunch of goons"
        , icon:"💀"

    },
]


export const prompt = `Generate travel plan for location :{location}, for {numberofdays} days for {alongwith} with {amountofmoney} budget , give me a hotels options list with hotel name, hotel address, price , hotel image url , geo coordinates , rating, descriptions and suggest itinerary with placename, place details , place image url , geo coordinates , ticket pricing , time to travel each of the location for 3 days with each day plan with best time to visite in json format `