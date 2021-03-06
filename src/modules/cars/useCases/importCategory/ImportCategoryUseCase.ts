import { parse } from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  // loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
  //   return new Promise((resolve, reject) => {
  //     const stream = fs.createReadStream(file.path);

  //     const categories: IImportCategory[] = [];

  //     const parseFile = parse({ delimiter: ';' });

  //     stream.pipe(parseFile);

  //     parseFile
  //       .on('data', async (line) => {
  //         const [name, description] = line;

  //         categories.push({
  //           name,
  //           description,
  //         });
  //       })
  //       .on('end', () => {
  //         resolve(categories);
  //       })
  //       .on('error', (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    const stream = fs.createReadStream(file.path);

    const categories: IImportCategory[] = [];

    const parseFile = parse({ delimiter: ';' });

    stream.pipe(parseFile);

    await parseFile.on('data', async (line) => {
      const [name, description] = line;

      categories.push({
        name,
        description,
      });
    });

    return categories;
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    console.log(categories);
  }
}

export { ImportCategoryUseCase };
