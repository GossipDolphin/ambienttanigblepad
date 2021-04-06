let pin1 = 0
let strip = neopixel.create(DigitalPin.P8, 60, NeoPixelMode.RGB)
let playerConnected = 1
radio.setGroup(1)
strip.setBrightness(200)
let color = neopixel.rgb(255, 0, 0)
let thisName = control.deviceName()
basic.forever(function () {
    pin1 = pins.digitalReadPin(DigitalPin.P2)
    if (pin1 == 1) {
        radio.sendValue(thisName, 1)
        if (playerConnected == 0) {
            color = neopixel.rgb(0, 0, 255)
            strip.showColor(color)
        }
        if (playerConnected == 1) {
            color = neopixel.rgb(255, 0, 0)
            strip.showColor(color)
        }
    }
    if (pin1 == 0) {
        radio.sendValue(thisName, 0)
        if (playerConnected == 0) {
            color = neopixel.rgb(0, 255, 0)
            strip.showColor(color)
        }
        if (playerConnected == 1) {
            color = neopixel.rgb(0, 0, 255)
            strip.showColor(color)
        }
    }
    radio.onReceivedValue(function (name: string, value: number) {
        if(thisName != name && value === 0){
            playerConnected = 0;
        }
        if(thisName != name && value === 1){
            playerConnected = 1;
        }
    })
strip.show()
})
