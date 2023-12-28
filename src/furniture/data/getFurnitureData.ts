import jsonData from './furnitureData.json'
import {FurnitureDataInterface} from "./furnitureData.interface";
export function getFurnitureData (): FurnitureDataInterface[] {
    return jsonData as FurnitureDataInterface[]
}