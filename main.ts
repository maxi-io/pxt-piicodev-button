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
    export function setLed(status:switchType): void {
        let buf = pins.createBuffer(2)
        buf[0] = setBit(registerType.led, 7) // set bit 7 to write to register
        buf[1] = status
        pins.i2cWriteBuffer(DEFAULT_BASE_ADDRESS, buf, false)
    }

    //% blockId="piicodev_button_press_count" block="Get button press count"
    //% weight=99 blockGap=20
    export function pressCount(): number {
        pins.i2cWriteNumber(DEFAULT_BASE_ADDRESS, registerType.pressCount, NumberFormat.Int8LE, true)
        let count = pins.i2cReadNumber(DEFAULT_BASE_ADDRESS, NumberFormat.Int16BE, false)
        return count
    }

    //% blockId="piicodev_button_id" block="Get button Id"
    //% weight=99 blockGap=20
    export function whoAmI(): number {
        pins.i2cWriteNumber(DEFAULT_BASE_ADDRESS, registerType.whoAmI, NumberFormat.Int8LE, true)
        let deviceId = pins.i2cReadNumber(DEFAULT_BASE_ADDRESS, NumberFormat.Int16BE, false)
        return deviceId
    }

}
