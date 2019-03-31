import { Matrix2D } from "./Matrix2D";

/**
 * 中心为原点,忽略z
 * @param width 
 * @param height 
 * @param flipY 如果为 false 则y轴向上为正，并且 rotation 逆时针为正。并且需要调用flipY确保贴图正确
 */
export function center2D(width: number, height: number, flipY: boolean = true): Matrix2D {
    return new Matrix2D(
        2 / width, 0,
        0, ((flipY ? -2 : 2) / height),
        0, 0
    );
}

/**
 * 3x3 矩阵，2D投影矩阵，忽略Z轴，直接投影为Canvas的宽高大小
 * 
 * @static
 * @param {number} width canvas width
 * @param {number} height canvas height
 * @param flipY 如果为 false 则y轴向上为正，并且 rotation 逆时针为正。并且需要调用flipY确保贴图正确
 * @returns (description)
 */
export function topleft2D(width: number, height: number, flipY: boolean = true) {
    if (flipY) {
        return new Matrix2D(2 / width, 0, 0, -2 / height, -1, 1);
    } else {
        return new Matrix2D(2 / width, 0, 0, 2 / height, -1, -1);
    }
}