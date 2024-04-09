import type JsPDF from "jspdf"

import { INDENT_FROM_LEFT, PAGE_WIDTH } from "containers/application-bar/pdf/const"
import { ubuntuBold } from "common/fonts/ubuntu-bold"
import { ubuntuMedium } from "common/fonts/ubuntu-medium"
import { ubuntuRegular } from "common/fonts/ubuntu-regular"

export function fromPxToMm(size: number | undefined): number {
  return ((size ?? 1) * 25.4) / 100
}
// eslint-disable-next-line max-len
export const getRightTextX = (doc: JsPDF, date: string): number =>
  PAGE_WIDTH - INDENT_FROM_LEFT * 2 - ((doc.getStringUnitWidth(date) / 4) * 25.6) / 2 - 3

export function getCurrentPage(doc: JsPDF): number {
  const docInternal = doc.internal as unknown as {
    getCurrentPageInfo: () => { pageNumber: number }
  }
  return docInternal.getCurrentPageInfo().pageNumber
}

export function addUbuntuFontBold(doc: JsPDF): void {
  doc.addFileToVFS("Ubuntu-Bold.ttf", ubuntuBold)
  doc.addFont("Ubuntu-Bold.ttf", "Ubuntu", "normal", 400)
  doc.setFont("Ubuntu", "normal", 400)
}

export function addUbuntuFontRegular(doc: JsPDF): void {
  doc.addFileToVFS("Ubuntu-Regular.ttf", ubuntuRegular)
  doc.addFont("Ubuntu-Regular.ttf", "Ubuntu", "normal", 400)
  doc.setFont("Ubuntu", "normal", 400)
}

export function addUbuntuFontMedium(doc: JsPDF): void {
  doc.addFileToVFS("Ubuntu-Medium.ttf", ubuntuMedium)
  doc.addFont("Ubuntu-Medium.ttf", "Ubuntu", "normal", 400)
  doc.setFont("Ubuntu", "normal", 400)
}

export function setTextColorBlack(doc: JsPDF): void {
  doc.setTextColor(35)
}

export function setTextColorGray(doc: JsPDF): void {
  doc.setTextColor(57)
}

export function setTextColorBlue(doc: JsPDF): void {
  doc.setTextColor(0, 0, 225)
}

export function setFillColorBlack(doc: JsPDF): void {
  doc.setFillColor(35, 35, 35)
}

export function setFillColorBlueGray(doc: JsPDF): void {
  doc.setFillColor(226, 230, 254)
}

export function setFillColorGray(doc: JsPDF): void {
  doc.setFillColor(221, 221, 221)
}

export function setFillColorBlue(doc: JsPDF): void {
  doc.setFillColor(42, 87, 224)
}
