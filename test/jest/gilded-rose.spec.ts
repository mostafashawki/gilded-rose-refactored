import { Item, GildedRose, ItemType } from '@/gilded-rose';

describe('GildedRose', () => {
  let gildedRose: GildedRose;
  let items: Item[];

  beforeEach(() => {
    items = [
      new Item('item1', 5, 10),
      new Item(ItemType.AgedBrie, 2, 10),
      new Item(ItemType.Sulfuras, 0, 80),
      new Item(ItemType.BackstagePasses, 15, 20),
    ];
    gildedRose = new GildedRose(items);
  });

  describe('updateQuality', () => {
    it('should decrease quality and sellIn for a normal item', () => {
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].sellIn).toBe(4);
      expect(updatedItems[0].quality).toBe(9);
    });

    it('should increase quality and decrease sellIn for "Aged Brie"', () => {
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[1].sellIn).toBe(1);
      expect(updatedItems[1].quality).toBe(11);
    });

    it('should not modify "Sulfuras" items', () => {
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[2].sellIn).toBe(0);
      expect(updatedItems[2].quality).toBe(80);
    });

    it('should update quality and sellIn for "Backstage passes"', () => {
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[3].sellIn).toBe(14);
      expect(updatedItems[3].quality).toBe(21);
    });
  });
});
