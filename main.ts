/**
* PiicoDev Button
* Refer to https://core-electronics.com.au/piicodev-button.html
*/

//% weight=9 color=#666699 icon="\uf001" block="DFPlayer Pro"
namespace piicodev {

    const DEFAULT_BASE_ADDRESS = 0X42;

    export enum registerType {
        //% block="Is Pressed"
        isPressed = 0X11,
        //% block="Was Pressed"
        wasPressed = 0X12,
    }

    //% blockId="piicodev_press" block="is pressed"
    //% weight=99 blockGap=20
    export function isPressed(): boolean {
        pins.i2cWriteNumber( DEFAULT_BASE_ADDRESS, registerType.isPressed, NumberFormat.Int8LE, false)
        let invalue = pins.i2cReadNumber(66, NumberFormat.Int8LE, false)
        return (invalue==1)
    }

    //% blockId="piicodev_press" block="was pressed"
    //% weight=99 blockGap=20
    export function wasPressed(): boolean {
        pins.i2cWriteNumber( DEFAULT_BASE_ADDRESS, registerType.wasPressed, NumberFormat.Int8LE, false)
        let invalue = pins.i2cReadNumber(66, NumberFormat.Int8LE, false)
        return (invalue == 1)
    }

}
