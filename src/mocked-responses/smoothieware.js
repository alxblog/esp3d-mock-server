module.exports = () =>
    "# Robot module configurations : general handling of movement G-codes and slicing into moves\n" +
    "default_feed_rate                            1000             # Default rate ( mm/minute ) for G1/G2/G3 moves\n" +
    "default_seek_rate                            1000             # Default rate ( mm/minute ) for G0 moves\n" +
    "mm_per_arc_segment                           0.5              # Arcs are cut into segments ( lines ), this is the length for these segments.  Smaller values mean more resolution, higher values mean faster computation\n" +
    "#mm_per_line_segment                          5                # Lines can be cut into segments ( not usefull with cartesian coordinates robots ).\n" +
    "\n" +
    "# Arm solution configuration : Cartesian robot. Translates mm positions into stepper positions\n" +
    "alpha_steps_per_mm                           80               # Steps per mm for alpha stepper\n" +
    "beta_steps_per_mm                            80               # Steps per mm for beta stepper\n" +
    "gamma_steps_per_mm                           1637.7953        # Steps per mm for gamma stepper\n" +
    "\n" +
    "# Planner module configuration : Look-ahead and acceleration configuration\n" +
    "planner_queue_size                           32               # DO NOT CHANGE THIS UNLESS YOU KNOW EXACTLY WHAT YOUR ARE DOING\n" +
    "acceleration                                 1000             # Acceleration in mm/second/second.\n" +
    "#z_acceleration                              60              # Acceleration for Z only moves in mm/s^2, 0 disables it, disabled by default. DO NOT SET ON A DELTA\n" +
    "acceleration_ticks_per_second                1000             # Number of times per second the speed is updated\n" +
    'junction_deviation                           0.05             # Similar to the old "max_jerk", in millimeters, see : https://github.com/grbl/grbl/blob/master/planner.c#L409\n' +
    "                                                              # and https://github.com/grbl/grbl/wiki/Configuring-Grbl-v0.8 . Lower values mean being more careful, higher values means being faster and have more jerk\n" +
    "\n" +
    "# Stepper module configuration\n" +
    "microseconds_per_step_pulse                  1                # Duration of step pulses to stepper drivers, in microseconds\n" +
    "base_stepping_frequency                      100000           # Base frequency for stepping\n" +
    "\n" +
    '# Stepper module pins ( ports, and pin numbers, appending "!" to the number will invert a pin )\n' +
    "alpha_step_pin                               2.1              # Pin for alpha stepper step signal\n" +
    "alpha_dir_pin                                0.11             # Pin for alpha stepper direction\n" +
    "alpha_en_pin                                 0.10            # Pin for alpha enable pin 0.10\n" +
    "alpha_current                                1.0              # X stepper motor current\n" +
    "x_axis_max_speed                             1000            # mm/min\n" +
    "alpha_max_rate                               1000.0          # mm/min actuator max speed\n" +
    "\n" +
    "beta_step_pin                                2.2              # Pin for beta stepper step signal\n" +
    "beta_dir_pin                                 0.20             # Pin for beta stepper direction\n" +
    "beta_en_pin                                  0.19             # Pin for beta enable\n" +
    "beta_current                                 1.0              # Y stepper motor current\n" +
    "y_axis_max_speed                             1000            # mm/min\n" +
    "beta_max_rate                                1000.0          # mm/min actuator max speed\n" +
    "\n" +
    "gamma_step_pin                               2.3              # Pin for gamma stepper step signal\n" +
    "gamma_dir_pin                                0.22             # Pin for gamma stepper direction\n" +
    "gamma_en_pin                                 0.21             # Pin for gamma enable\n" +
    "gamma_current                                1.0              # Z stepper motor current\n" +
    "z_axis_max_speed                             60              # mm/min\n" +
    "gamma_max_rate                               60.0            # mm/min actuator max speed\n" +
    "\n" +
    "# Serial communications configuration ( baud rate default to 9600 if undefined )\n" +
    "uart0.baud_rate                              115200           # Baud rate for the default hardware serial port\n" +
    "second_usb_serial_enable                     false            # This enables a second usb serial port (to have both pronterface and a terminal connected)\n" +
    "msd_disable                                 true            # disable the MSD (USB SDCARD) when set to true\n" +
    "\n" +
    "\n" +
    "# Extruder module configuration\n" +
    "extruder.hotend.enable                          true             # Whether to activate the extruder module at all. All configuration is ignored if false\n" +
    "#extruder.hotend.steps_per_mm                    140              # Steps per mm for extruder stepper\n" +
    "#extruder.hotend.default_feed_rate               600              # Default rate ( mm/minute ) for moves where only the extruder moves\n" +
    "#extruder.hotend.acceleration                    500              # Acceleration for the stepper motor mm/sec²\n" +
    "#extruder.hotend.max_speed                       50               # mm/s\n" +
    "\n" +
    "#extruder.hotend.step_pin                        2.0              # Pin for extruder step signal\n" +
    "#extruder.hotend.dir_pin                         0.5             # Pin for extruder dir signal\n" +
    "#extruder.hotend.en_pin                          0.4             # Pin for extruder enable signal\n" +
    "\n" +
    "# extruder offset\n" +
    "#extruder.hotend.x_offset                        0                # x offset from origin in mm\n" +
    "#extruder.hotend.y_offset                        0                # y offset from origin in mm\n" +
    "#extruder.hotend.z_offset                        0                # z offset from origin in mm\n" +
    "\n" +
    "# firmware retract settings when using G10/G11, these are the defaults if not defined, must be defined for each extruder if not using the defaults\n" +
    "#extruder.hotend.retract_length                  3               # retract length in mm\n" +
    "#extruder.hotend.retract_feedrate                45              # retract feedrate in mm/sec\n" +
    "#extruder.hotend.retract_recover_length          0               # additional length for recover\n" +
    "#extruder.hotend.retract_recover_feedrate        8               # recover feedrate in mm/sec (should be less than retract feedrate)\n" +
    "#extruder.hotend.retract_zlift_length            0               # zlift on retract in mm, 0 disables\n" +
    "#extruder.hotend.retract_zlift_feedrate          6000            # zlift feedrate in mm/min (Note mm/min NOT mm/sec)\n" +
    "delta_current                                1.0              # Extruder stepper motor current\n" +
    "\n" +
    "# Second extruder module configuration\n" +
    "extruder.hotend2.enable                          true             # Whether to activate the extruder module at all. All configuration is ignored if false\n" +
    "extruder.hotend2.steps_per_mm                    140              # Steps per mm for extruder stepper\n" +
    "extruder.hotend2.default_feed_rate               600              # Default rate ( mm/minute ) for moves where only the extruder moves\n" +
    "extruder.hotend2.acceleration                    500              # Acceleration for the stepper motor, as of 0.6, arbitrary ratio\n" +
    "extruder.hotend2.max_speed                       50               # mm/s\n" +
    "\n" +
    "extruder.hotend2.step_pin                        2.8              # Pin for extruder step signal\n" +
    "extruder.hotend2.dir_pin                         2.13             # Pin for extruder dir signal\n" +
    "extruder.hotend2.en_pin                          4.29             # Pin for extruder enable signal\n" +
    "\n" +
    "extruder.hotend2.x_offset                        0                # x offset from origin in mm\n" +
    "extruder.hotend2.y_offset                        25.0             # y offset from origin in mm\n" +
    "extruder.hotend2.z_offset                        0                # z offset from origin in mm\n" +
    "epsilon_current                              1.5              # Second extruder stepper motor current\n" +
    "\n" +
    "\n" +
    "\n" +
    "# Laser module configuration\n" +
    "laser_module_enable                          false            # Whether to activate the laser module at all. All configuration is ignored if false.\n" +
    "laser_module_pin                             2.7              # this pin will be PWMed to control the laser\n" +
    "laser_module_max_power                       0.8              # this is the maximum duty cycle that will be applied to the laser\n" +
    "laser_module_tickle_power                    0.0              # this duty cycle will be used for travel moves to keep the laser active without actually burning\n" +
    "\n" +
    "# Hotend temperature control configuration\n" +
    'temperature_control.hotend.enable            true             # Whether to activate this ( "hotend" ) module at all. All configuration is ignored if false.\n' +
    "#temperature_control.hotend.thermistor_pin    0.23             # Pin for the thermistor to read\n" +
    "#temperature_control.hotend.heater_pin        2.5              # Pin that controls the heater\n" +
    "#temperature_control.hotend.thermistor        EPCOS100K        # see http://smoothieware.org/temperaturecontrol#toc5\n" +
    "#temperature_control.hotend.beta             4066             # or set the beta value\n" +
    "\n" +
    "#temperature_control.hotend.set_m_code        104              #\n" +
    "#temperature_control.hotend.set_and_wait_m_code 109            #\n" +
    "#temperature_control.hotend.designator        T                #\n" +
    "\n" +
    "#temperature_control.hotend.p_factor          13.7             #\n" +
    "#temperature_control.hotend.i_factor          0.097            #\n" +
    "#temperature_control.hotend.d_factor          24               #\n" +
    "\n" +
    "#temperature_control.hotend.max_pwm          64               # max pwm, 64 is a good value if driving a 12v resistor with 24v.\n" +
    "\n" +
    "# Hotend2 temperature control configuration\n" +
    'temperature_control.hotend2.enable            false             # Whether to activate this ( "hotend" ) module at all. All configuration is ignored if false.\n' +
    "\n" +
    "#temperature_control.hotend2.thermistor_pin    0.25             # Pin for the thermistor to read\n" +
    "#temperature_control.hotend2.heater_pin        2.4             # Pin that controls the heater\n" +
    "#temperature_control.hotend2.thermistor        EPCOS100K        # see http://smoothieware.org/temperaturecontrol#toc5\n" +
    "##temperature_control.hotend2.beta             4066             # or set the beta value\n" +
    "#temperature_control.hotend2.set_m_code        104             #\n" +
    "#temperature_control.hotend2.set_and_wait_m_code 109            #\n" +
    "#temperature_control.hotend2.designator        T1               #\n" +
    "\n" +
    "#temperature_control.hotend2.p_factor          13.7           # permanently set the PID values after an auto pid\n" +
    "#temperature_control.hotend2.i_factor          0.097          #\n" +
    "#temperature_control.hotend2.d_factor          24             #\n" +
    "\n" +
    "#temperature_control.hotend2.max_pwm          64               # max pwm, 64 is a good value if driving a 12v resistor with 24v.\n" +
    "\n" +
    "temperature_control.bed.enable               false            #\n" +
    "#temperature_control.bed.thermistor_pin       0.24             #\n" +
    "#temperature_control.bed.heater_pin           2.7              #\n" +
    "#temperature_control.bed.thermistor           EPCOS100K    # see http://smoothieware.org/temperaturecontrol#toc5\n" +
    "#temperature_control.bed.beta                4066             # or set the beta value\n" +
    "\n" +
    "#temperature_control.bed.set_m_code           140              #\n" +
    "#temperature_control.bed.set_and_wait_m_code  190              #\n" +
    "#temperature_control.bed.designator           B                #\n" +
    "\n" +
    "#temperature_control.bed.max_pwm             64               # max pwm, 64 is a good value if driving a 12v resistor with 24v.\n" +
    "\n" +
    "# Switch module for led control\n" +
    "switch.led.enable                            true             #\n" +
    "switch.led.\n" +
    "switch.led.input_on_command                  M800            #\n" +
    "switch.led.input_off_command                 M801             #\n" +
    "switch.led.output_pin                        2.5              #\n" +
    "switch.led.output_type                       digital              #\n" +
    "switch.led.startup_value                       1              #\n" +
    "switch.led.startup_state                       true             #\n" +
    "\n" +
    "switch.misc.enable                           false            #\n" +
    "switch.misc.input_on_command                 M42              #\n" +
    "switch.misc.input_off_command                M43              #\n" +
    "switch.misc.output_pin                       2.4              #\n" +
    "\n" +
    "# automatically toggle a switch at a specified temperature. Different ones of these may be defined to monitor different temperatures and switch different swithxes\n" +
    "# useful to turn on a fan or water pump to cool the hotend\n" +
    "#temperatureswitch.hotend.enable                true             #\n" +
    "#temperatureswitch.hotend.designator          T                # first character of the temperature control designator to use as the temperature sensor to monitor\n" +
    "#temperatureswitch.hotend.switch              misc             # select which switch to use, matches the name of the defined switch\n" +
    "#temperatureswitch.hotend.threshold_temp      60.0             # temperature to turn on (if rising) or off the switch\n" +
    "#temperatureswitch.hotend.heatup_poll         15               # poll heatup at 15 sec intervals\n" +
    "#temperatureswitch.hotend.cooldown_poll       60               # poll cooldown at 60 sec intervals\n" +
    "\n" +
    "# filament out detector\n" +
    "#filament_detector.enable                     true             #\n" +
    "#filament_detector.encoder_pin                0.26             # must be interrupt enabled pin (0.26, 0.27, 0.28)\n" +
    "#filament_detector.seconds_per_check          2                # may need to be longer\n" +
    "#filament_detector.pulses_per_mm              1 .0             # will need to be tuned\n" +
    "#filament_detector.bulge_pin                  0.27             # optional bulge detector switch and/or manual suspend\n" +
    "\n" +
    "# Switch module for spindle control\n" +
    "#switch.spindle.enable                        false            #\n" +
    "\n" +
    "# Endstops\n" +
    "endstops_enable                              true             # the endstop module is enabled by default and can be disabled here\n" +
    "#corexy_homing                               false            # set to true if homing on a hbit or corexy\n" +
    "alpha_min_endstop                            1.24^            # add a ! to invert if endstop is NO connected to ground\n" +
    "#alpha_max_endstop                           1.24^            #\n" +
    "alpha_homing_direction                       home_to_min      # or set to home_to_max and set alpha_max\n" +
    "alpha_min                                    0                # this gets loaded after homing when home_to_min is set\n" +
    "alpha_max                                    380              # this gets loaded after homing when home_to_max is set\n" +
    "beta_min_endstop                             1.26^            #\n" +
    "#beta_max_endstop                            1.26^            #\n" +
    "beta_homing_direction                        home_to_min      #\n" +
    "beta_min                                     0                #\n" +
    "beta_max                                     440              #\n" +
    "gamma_min_endstop                            1.29^            #\n" +
    "#gamma_max_endstop                           1.29^            #\n" +
    "gamma_homing_direction                       home_to_min      #\n" +
    "gamma_min                                    0                #\n" +
    "gamma_max                                    180              #\n" +
    "\n" +
    "# optional enable limit switches, actions will stop if any enabled limit switch is triggered\n" +
    "#alpha_limit_enable                          false            # set to true to enable X min and max limit switches\n" +
    "#beta_limit_enable                           false            # set to true to enable Y min and max limit switches\n" +
    "#gamma_limit_enable                          false            # set to true to enable Z min and max limit switches\n" +
    "\n" +
    "#probe endstop\n" +
    "#probe_pin                                   1.29             # optional pin for probe\n" +
    "\n" +
    "alpha_fast_homing_rate_mm_s                  50               # feedrates in mm/second\n" +
    'beta_fast_homing_rate_mm_s                   50               # "\n' +
    'gamma_fast_homing_rate_mm_s                  4                # "\n' +
    'alpha_slow_homing_rate_mm_s                  25               # "\n' +
    'beta_slow_homing_rate_mm_s                   25               # "\n' +
    'gamma_slow_homing_rate_mm_s                  2                # "\n' +
    "\n" +
    "alpha_homing_retract_mm                      5                # distance in mm\n" +
    'beta_homing_retract_mm                       5                # "\n' +
    'gamma_homing_retract_mm                      5                # "\n' +
    "\n" +
    "#endstop_debounce_count                       100              # uncomment if you get noise on your endstops, default is 100\n" +
    "\n" +
    "# optional Z probe\n" +
    "zprobe.enable                                false           # set to true to enable a zprobe\n" +
    "#zprobe.probe_pin                             1.29!^          # pin probe is attached to if NC remove the !\n" +
    "#zprobe.slow_feedrate                         5               # mm/sec probe feed rate\n" +
    "#zprobe.debounce_count                       100             # set if noisy\n" +
    "#zprobe.fast_feedrate                         100             # move feedrate mm/sec\n" +
    "#zprobe.probe_height                          5               # how much above bed to start probe\n" +
    "\n" +
    "# associated with zprobe the leveling strategy to use\n" +
    "#leveling-strategy.three-point-leveling.enable         true        # a leveling strategy that probes three points to define a plane and keeps the Z parallel to that plane\n" +
    "#leveling-strategy.three-point-leveling.point1         100.0,0.0   # the first probe point (x,y) optional may be defined with M557\n" +
    "#leveling-strategy.three-point-leveling.point2         200.0,200.0 # the second probe point (x,y)\n" +
    "#leveling-strategy.three-point-leveling.point3         0.0,200.0   # the third probe point (x,y)\n" +
    "#leveling-strategy.three-point-leveling.home_first     true        # home the XY axis before probing\n" +
    "#leveling-strategy.three-point-leveling.tolerance      0.03        # the probe tolerance in mm, anything less that this will be ignored, default is 0.03mm\n" +
    "#leveling-strategy.three-point-leveling.probe_offsets  0,0,0       # the probe offsets from nozzle, must be x,y,z, default is no offset\n" +
    "#leveling-strategy.three-point-leveling.save_plane     false       # set to true to allow the bed plane to be saved with M500 default is false\n" +
    "\n" +
    "\n" +
    "# Pause button\n" +
    "pause_button_enable                          true             #\n" +
    "\n" +
    "# Panel See http://smoothieware.org/panel\n" +
    "panel.enable                                 true            # set to true to enable the panel code\n" +
    "\n" +
    "# Example viki2 config for an azteeg miniV2 with IDC cable\n" +
    "panel.lcd                                    viki2             # set type of panel\n" +
    "panel.spi_channel                            0                 # set spi channel to use P0_18,P0_15 MOSI,SCLK\n" +
    "panel.spi_cs_pin                             0.16              # set spi chip select\n" +
    "panel.encoder_a_pin                          3.25!^            # encoder pin\n" +
    "panel.encoder_b_pin                          3.26!^            # encoder pin\n" +
    "panel.click_button_pin                       2.11!^            # click button\n" +
    "panel.a0_pin                                 2.6               # st7565 needs an a0\n" +
    "panel.contrast                              8                 # override contrast setting (default is 9)\n" +
    "panel.encoder_resolution                    4                 # override number of clicks to move 1 item (default is 4)\n" +
    "#panel.button_pause_pin                      1.22^             # kill/pause set one of these for the auxilliary button on viki2\n" +
    "#panel.back_button_pin                       1.22!^            # back button recommended to use this on EXP1\n" +
    "panel.buzz_pin                               1.30              # pin for buzzer on EXP2\n" +
    "panel.red_led_pin                            0.26               # pin for red led on viki2 on EXP1\n" +
    "panel.blue_led_pin                           1.21              # pin for blue led on viki2 on EXP1\n" +
    "panel.external_sd                            true              # set to true if there is an extrernal sdcard on the panel\n" +
    "panel.external_sd.spi_channel                0                 # set spi channel the sdcard is on\n" +
    "panel.external_sd.spi_cs_pin                 1.23              # set spi chip select for the sdcard\n" +
    "panel.external_sd.sdcd_pin                   1.31!^            # sd detect signal (set to nc if no sdcard detect)\n" +
    "panel.menu_offset                            1                 # some panels will need 1 here\n" +
    "\n" +
    "\n" +
    "# Example miniviki2 config\n" +
    "#panel.lcd                                    mini_viki2        # set type of panel\n" +
    "#panel.spi_channel                            0                 # set spi channel to use P0_18,P0_15 MOSI,SCLK\n" +
    "#panel.spi_cs_pin                             0.16              # set spi chip select\n" +
    "#panel.encoder_a_pin                          3.25!^            # encoder pin\n" +
    "#panel.encoder_b_pin                          3.26!^            # encoder pin\n" +
    "#panel.click_button_pin                       2.11!^            # click button\n" +
    "#panel.a0_pin                                 2.6               # st7565 needs an a0\n" +
    "##panel.contrast                               18                # override contrast setting (default is 18)\n" +
    "##panel.encoder_resolution                     2                 # override number of clicks to move 1 item (default is 2)\n" +
    "#panel.menu_offset                            1                 # here controls how sensitive the menu is. some panels will need 1\n" +
    "\n" +
    "panel.alpha_jog_feedrate                     1000              # x jogging feedrate in mm/min\n" +
    "panel.beta_jog_feedrate                      1000              # y jogging feedrate in mm/min\n" +
    "panel.gamma_jog_feedrate                     4               # z jogging feedrate in mm/min\n" +
    "\n" +
    "#panel.hotend_temperature                     185               # temp to set hotend when preheat is selected\n" +
    "#panel.T1_temperature                     185               # temp to set hotend when preheat is selected\n" +
    "#panel.bed_temperature                        60                # temp to set bed when preheat is selected\n" +
    "\n" +
    "# Example of a custom menu entry, which will show up in the Custom entry.\n" +
    "# NOTE _ gets converted to space in the menu and commands, | is used to separate multiple commands\n" +
    "custom_menu.power_on.enable                true              #\n" +
    "custom_menu.power_on.name                  Light_on          #\n" +
    "custom_menu.power_on.command               M800               #\n" +
    "\n" +
    "custom_menu.power_off.enable               true              #\n" +
    "custom_menu.power_off.name                 Light_off         #\n" +
    "custom_menu.power_off.command M801 #\n" +
    "\n" +
    "# RE-ARM specific settings do not change\n" +
    "currentcontrol_module_enable                 false            #\n" +
    "digipot_max_current                          2.4             # max current\n" +
    "digipot_factor                               106.0           # factor for converting current to digipot value\n" +
    "leds_disable                                 true             # disable using leds after config loaded\n" +
    "\n" +
    "# network settings\n" +
    "network.enable                               false            # enable the ethernet network services\n" +
    "#network.webserver.enable                     true             # enable the webserver\n" +
    "#network.telnet.enable                        true             # enable the telnet server\n" +
    "#network.plan9.enable                         true             # enable the plan9 network filesystem\n" +
    "#network.ip_address                           auto             # the IP address\n" +
    "#network.ip_mask                             255.255.255.0    # the ip mask\n" +
    "#network.ip_gateway                          192.168.3.1      # the gateway address\n" +
    "\n" +
    "return_error_on_unhandled_gcode              false            #\n" +
    "ok\n"
