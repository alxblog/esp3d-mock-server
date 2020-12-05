module.exports = `
echo:  G21    ; Units in mm (mm)
echo:; Filament settings: Disabled
echo:  M200 D3.00
echo:  M200 D0
echo:; Steps per unit:
echo: M92 X80.00 Y80.00 Z4000.00 E500.00
echo:; Maximum feedrates (units/s):
echo:  M203 X300.00 Y300.00 Z5.00 E25.00
echo:; Maximum Acceleration (units/s2):
echo:  M201 X3000.00 Y3000.00 Z100.00 E10000.00
echo:; Acceleration (units/s2): P<print_accel> R T
echo:  M204 P3000.00 R3000.00 T3000.00
echo:; Advanced: B S T J
echo:  M205 B20000.00 S0.00 T0.00 J0.01
echo:; Home offset:
echo:  M206 X0.00 Y0.00 Z0.00
echo:; PID settings:
echo:  M301 P22.20 I1.08 D114.00
ok
`