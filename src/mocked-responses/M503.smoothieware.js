module.exports = `
; config override present: /sd/config-override
;Steps per unit:
M92 X80.00000 Y80.00000 Z1637.79529 
;Acceleration mm/sec^2:
M204 S1000.00000 
;X- Junction Deviation, Z- Z junction deviation, S - Minimum Planner speed mm/sec:
M205 X0.05000 Z-1.00000 S0.00000
;Max cartesian feedrates in mm/sec:
M203 X16.66667 Y16.66667 Z1.00000 S-1.00000
;Max actuator feedrates in mm/sec:
M203.1 X16.66667 Y16.66667 Z1.00000 
;E Steps per mm:
M92 E1.0000 P57988
;E Filament diameter:
M200 D0.0000 P57988
;E retract length, feedrate:
M207 S3.0000 F2700.0000 Z0.0000 Q6000.0000 P57988
;E retract recover length, feedrate:
M208 S0.0000 F480.0000 P57988
;E acceleration mm/sec²:
M204 E1000.0000 P57988
;E max feed rate mm/sec:
M203 E1000.0000 P57988
;E Steps per mm:
M92 E140.0000 P39350
;E Filament diameter:
M200 D0.0000 P39350
;E retract length, feedrate:
M207 S3.0000 F2700.0000 Z0.0000 Q6000.0000 P39350
;E retract recover length, feedrate:
M208 S0.0000 F480.0000 P39350
;E acceleration mm/sec²:
M204 E500.0000 P39350
;E max feed rate mm/sec:
M203 E50.0000 P39350
;Home offset (mm):
M206 X0.00 Y0.00 Z0.00 
ok
`