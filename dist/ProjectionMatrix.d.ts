import { Matrix2D } from "./Matrix2D";
/**
 * 中心为原点,忽略z
 * @param width
 * @param height
 * @param flipY 如果为 false 则y轴向上为正，并且 rotation 逆时针为正。并且需要调用flipY确保贴图正确
 */
export declare function center2D(width: number, height: number, flipY?: boolean): Matrix2D;
/**
 * 3x3 矩阵，2D投影矩阵，忽略Z轴，直接投影为Canvas的宽高大小
 *
 * @static
 * @param {number} width canvas width
 * @param {number} height canvas height
 * @param flipY 如果为 false 则y轴向上为正，并且 rotation 逆时针为正。并且需要调用flipY确保贴图正确
 * @returns (description)
 */
export declare function topleft2D(width: number, height: number, flipY?: boolean): Matrix2D;
