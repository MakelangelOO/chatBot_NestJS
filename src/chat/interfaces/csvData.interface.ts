export interface CsvData { //this DTO is only good for obtain the csv file data row
    //all recovered data are strings to avoid incompatibility problems
    displayTitle: string
    embeddingText: string
    url: string
    imageUrl: string
    productType: string
    discount: string
    price: string
    variants: string
    createDate: string
}