/*
 * @Author: yangshuaibin@myhexin.com
 * @Date: 2025-04-03 15:15:54
 * @LastEditors: yangshuaibin@myhexin.com
 * @LastEditTime: 2025-05-16 16:54:51
 * @Description: 
 */
/*
This is a TypeScript declaration file that provides type declaration support for Vite projects. The file references Vite client type definitions through triple-slash directives.
*/
/*
System Overview:
- This file is a type declaration file for Vite + React + TypeScript projects
- Mainly used to ensure TypeScript compiler can correctly recognize Vite-specific types

Dependencies:
- Depends on vite/client type definition package

Technical Details:
- Uses triple-slash directive (/// <reference types="..." />) to reference external type definitions
- This is standard TypeScript syntax for declaring compile-time dependencies

Usage Scenarios:
- Provides type support when importing resource files like .css, .svg, .png in the project
- Supports Vite-specific features, such as type definitions for import.meta.env

Notes:
- This file typically doesn't require manual modification
- Automatically generated by Vite during project creation
- For extending type definitions, it's recommended to create separate declaration files

Deployment Instructions:
- This file is only used in development environment
- Will not be included in production build
*/
/// <reference types="vite/client" />
