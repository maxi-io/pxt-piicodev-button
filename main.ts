/**
* PiicoDev Button
* Refer to https://core-electronics.com.au/piicodev-button.html
*/

//% weight=9 color=#666699 icon="\uf001" block="PiicoDev Button"
namespace piicodev {

    const DEFAULT_BASE_ADDRESS = 0x42;

    export enum registerType {
        //% block="Who Am I"
        whoAmI = 0x01,
        //% block="Firmware Maj"
        firmwareMaj = 0x02,
        //% block="Firmware Min"
        firmwareMin = 0x03,
        //% block="I2C Address"
        i2cAddress = 0x04,
        //% block="LED"
        led = 0x05,
        //% block="Is Pressed"
        isPressed = 0x11,
        //% block="Was Pressed"
        wasPressed = 0x12,
        //% block="Double Press Detected"
        doublePressDetected = 0x13,
        //% block="Press Count"
        pressCount = 0x14,
    }

    export enum switchType {
        //% block="Off"
        Off = 0,
        //% block="On"
        On = 1,
    }

    function setBit(x: number, n: number): number {
        return x | (1 << n);
    }

    //% blockId="piicodev_ispressed" block="is pressed"
    //% weight=99 blockGap=20
    export function isPressed(): boolean {
        pins.i2cWriteNumber( DEFAULT_BASE_ADDRESS, registerType.isPressed, NumberFormat.Int8LE, false)
        let invalue = pins.i2cReadNumber( DEFAULT_BASE_ADDRESS, NumberFormat.Int8LE, false)
        return (invalue==0)
    }

    //% blockId="piicodev_waspressed" block="was pressed"
    //% weight=99 blockGap=20
    export function wasPressed(): boolean {
        pins.i2cWriteNumber( DEFAULT_BASE_ADDRESS, registerType.wasPressed, NumberFormat.Int8LE, false)
        let invalue = pins.i2cReadNumber( DEFAULT_BASE_ADDRESS, NumberFormat.Int8LE, false)
        return (invalue == 1)
    }

    //% blockId="piicodev_led_status" block="is LED on"
    //% weight=99 blockGap=20
    export function isLedOn(): boolean {
        pins.i2cWriteNumber(DEFAULT_BASE_ADDRESS, registerType.led, NumberFormat.Int8LE, false)
        let invalue = pins.i2cReadNumber(DEFAULT_BASE_ADDRESS, NumberFormat.Int8LE, false)
        return (invalue == 1)
    }

    //% blockId="piicodev_led_setter" block="Switch LED %status"
    //% weight=99 blockGap=20
    export function setLed(status:switchType): number {
        let buf = pins.createBuffer(2)
        buf[0] = 0x85
        buf[1] = 0x01
        return pins.i2cWriteBuffer(DEFAULT_BASE_ADDRESS, buf, false)
    }

}
