# Length Converter PCF Control

A Power Apps Component Framework (PCF) control that allows users to convert and edit length measurements in various units.

## Description

The Length Converter control provides a user-friendly interface for handling length data. It allows users to view and enter values in their preferred unit (e.g., Feet, Inches) while ensuring the data is stored in a standardized "base unit" (e.g., Meters) within the Dataverse environment.

## Features

- **Multi-Unit Support**: Comprehensive support for metric and imperial units:
  - Meters (m)
  - Centimeters (cm)
  - Millimeters (mm)
  - Kilometers (km)
  - Feet (ft)
  - Inches (in)
  - Yards (yd)
  - Miles (mi)
- **Automatic Conversion**: Seamlessly converts values between the display unit and the configured base unit.
- **Fluent UI**: Built with Fluent UI React components for a modern and consistent look and feel.
- **Real-time Updates**: Updates the underlying Dataverse field in real-time as the user types or changes units.

## Configuration

The control expects the following properties:

| Property | Description | Type | Usage |
| :--- | :--- | :--- | :--- |
| **Control Value** | The value of the field to be converted. | Whole.None, Currency, FP, Decimal | Bound |
| **Base Unit** | The unit in which the data is stored in the database. | Enum (m, cm, mm, km, ft, in, yd, mi) | Input |

### Example Configuration

If your Dataverse column stores length in **Meters**, set the `Base Unit` property to `m`. Users can then select "Feet" in the control to see the value converted to feet, edit it in feet, and the control will save the equivalent meter value back to Dataverse.

## Authors

- **Abhishek Vankar**
  - [GitHub](https://github.com/AbhishekVankar)
  - [LinkedIn](https://linkedin.com/in/abhishek-vankar)
  - [Website](https://tinyurl.com/abhishekvankar)

- **Advic Tech**
  - [GitHub](https://github.com/advicdeveloper)
  - [LinkedIn](https://www.linkedin.com/company/advic-tech/)
  - [Website](https://advic.io/)
