export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export enum ItemType {
  AgedBrie = 'Aged Brie',
  BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
}

export class GildedRose {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    const qualityUpdateMap: { [key in ItemType]: (item: Item) => void } = {
      [ItemType.AgedBrie]: (item: Item) => {
        if (item.quality < 50) {
          item.quality++;
        }
      },
      [ItemType.BackstagePasses]: (item: Item) => {
        if (item.sellIn <= 0) {
          item.quality = 0;
        } else if (item.sellIn <= 5) {
          item.quality += 3;
        } else if (item.sellIn <= 10) {
          item.quality += 2;
        } else {
          item.quality++;
        }
      },
      [ItemType.Sulfuras]: () => {}, // No quality update for "Sulfuras"
    };

    this.items.forEach((currentItem) => {
      if (currentItem.name !== ItemType.Sulfuras) {
        const qualityUpdateFn = qualityUpdateMap[currentItem.name] || (() => {
          if (currentItem.quality > 0) {
            currentItem.quality -= currentItem.sellIn < 0 ? 2 : 1;
          }
        });

        qualityUpdateFn(currentItem);
        currentItem.sellIn--;
        currentItem.quality = Math.max(0, Math.min(currentItem.quality, 50));
      }
    });

    return this.items;
  }
}
