import { describe, it, expect, beforeEach } from 'vitest';
import { createTestDatabase } from '../../db/test-helpers';
import { publishers } from '../../db/schema';
import type { Database } from './db';
import { getAllPublishers } from './publishers';

describe('publishers data-access helpers', () => {
    let db: Database;

    beforeEach(async () => {
        db = await createTestDatabase();
    });

    it('returns all publishers ordered by name', async () => {
        await db.insert(publishers).values([
            { name: 'Zenith Games', description: 'A publisher' },
            { name: 'Apex Studios', description: 'Another publisher' },
        ]);

        await expect(getAllPublishers(db)).resolves.toEqual([
            { id: expect.any(Number), name: 'Apex Studios' },
            { id: expect.any(Number), name: 'Zenith Games' },
        ]);
    });

    it('returns an empty array when no publishers exist', async () => {
        await expect(getAllPublishers(db)).resolves.toEqual([]);
    });
});
