/**
* PiicoDev Button
* Refer to https://core-electronics.com.au/piicodev-button.html
*/

//% weight=9 color=#666699 icon="\uf001" block="PiicoDev Button"
namespace piicodev {

    const DEFAULT_BASE_ADDRESS = 0x42;

    let buttonAdress: Array<number> = [DEFAULT_BASE_ADDRESS, DEFAULT_BASE_ADDRESS, DEFAULT_BASE_ADDRESS, DEFAULT_BASE_ADDRESS];

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
        //% block="On"pins.map(0, 0, 1023, 0, 4)
        On = 1,
    }

    export enum addressType {
        //% block="0000"
        addr0 = 0x42,
        //% block="1000"
        addr1 = 0x09,
        //% block="0100"
        addr2 = 0x10,
        //% block="1100"
        addr3 = 0x11,
        //% block="0010"
        addr4 = 0x12,
        //% block="1010"
        addr5 = 0X13,
        //% block="0110"
        addr6 = 0x14,
        //% block="1110"
        addr7 = 0X15,
        //% block="0001"
        addr8 = 0x16,
        //% block="1001"
        addr9 = 0x17,
        //% block="0101"
        addr10 = 0x18,
        //% block="1101"
        addr11 = 0x19,
        //% block="0011"
        addr12 = 0x20,
        //% block="1011"
        addr13 = 0x21,
        //% block="0111"
        addr14 = 0x22,
        //% block="1111"
        addr15 = 0x23
    }

    export enum buttonLabelType {
        //% block="button 1"
        b1 = 0,
        //% block="button 2"
        b2 = 1,
        //% block="button 3"
        b3 = 2,
        //% block="button 4"
        b4 = 3,
        //% block="button 5"
        b5 = 4,
        //% block="button 6"
        b6 = 5,
        //% block="button 7"
        b7 = 6,
        //% block="button 8"
        b8 = 7,
    }

    function setBit(x: number, n: number): number {
        return x | (1 << n);
    }

    //% blockId="piicodev_ispressed" block="is %buttonId pressed"
    //% weight=99 blockGap=20
    export function isPressed(buttonId: buttonLabelType): boolean {
        pins.i2cWriteNumber(buttonAdress[buttonId], registerType.isPressed, NumberFormat.Int8LE, false)
        let invalue = pins.i2cReadNumber(buttonAdress[buttonId], NumberFormat.Int8LE, false)
        return (invalue==0)
    }

    //% blockId="piicodev_waspressed" block="was %buttonId pressed"
    //% weight=99 blockGap=20
    export function wasPressed(buttonId: buttonLabelType): boolean {
        pins.i2cWriteNumber(buttonAdress[buttonId], registerType.wasPressed, NumberFormat.Int8LE, false)
        let invalue = pins.i2cReadNumber(buttonAdress[buttonId], NumberFormat.Int8LE, false)
        return (invalue == 1)
    }

    //% blockId="piicodev_led_status" block="is %buttonId LED on"
    //% weight=99 blockGap=20
    export function isLedOn(buttonId: buttonLabelType): boolean {
        pins.i2cWriteNumber(buttonAdress[buttonId], registerType.led, NumberFormat.Int8LE, false)
        let invalue = pins.i2cReadNumber(buttonAdress[buttonId], NumberFormat.Int8LE, false)
        return (invalue == 1)
    }

    //% blockId="piicodev_led_setter" block="Switch %buttonId LED %status"
    //% weight=99 blockGap=20
    export function setLed(buttonId: buttonLabelType, status:switchType): void {
        let buf = pins.createBuffer(2)
        buf[0] = setBit(registerType.led, 7) // set bit 7 to write to register
        buf[1] = status
        pins.i2cWriteBuffer(buttonAdress[buttonId], buf, false)
    }

    //% blockId="piicodev_button_press_count" block="Get %buttonId press count"
    //% weight=99 blockGap=20
    export function pressCount(buttonId: buttonLabelType): number {
        pins.i2cWriteNumber(buttonAdress[buttonId], registerType.pressCount, NumberFormat.Int8LE, true)
        let count = pins.i2cReadNumber(buttonAdress[buttonId], NumberFormat.Int16BE, false)
        return count
    }

    //% blockId="piicodev_button_id" block="Get button:%buttonId Id"
    //% weight=99 blockGap=20
    export function whoAmI(buttonId: buttonLabelType): number {
        pins.i2cWriteNumber(buttonAdress[buttonId], registerType.whoAmI, NumberFormat.Int8LE, true)
        let deviceId = pins.i2cReadNumber(buttonAdress[buttonId], NumberFormat.Int16BE, false)
        return deviceId
    }

    //% blockId="piicodev_configure_button" block="Configure Button:%buttonId Address:%address"
    //% weight=99 blockGap=20
    export function configButton(buttonId:buttonLabelType, address:addressType): void {
        buttonAdress[buttonId] = address;
    }

    //% blockId="piicodev_get_button_addr" block="Get button:%buttonId Address"
    //% weight=99 blockGap=20
    export function getButtonAddress(buttonId: buttonLabelType): number {
        
        return buttonAdress[buttonId]
    }

}
