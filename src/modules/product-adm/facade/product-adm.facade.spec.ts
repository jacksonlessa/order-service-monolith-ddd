import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";

describe("ProductAdmFacade test", () => {
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true}
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });
  

  afterEach(async() => {
    await sequelize.close();
  });

  it("should create a product", async() => {
    const productFacade = ProductAdmFacadeFactory.create()

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    }

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({where: {id: 1}});
 
    expect(product).toBeDefined()
    expect(product.id).toBe(input.id)
    expect(product.name).toBe(input.name)
    expect(product.description).toBe(input.description)
    expect(product.purchasePrice).toBe(input.purchasePrice)
    expect(product.stock).toBe(input.stock)
  })

  it("should get stock of a product", async () => {
    const productFacade = ProductAdmFacadeFactory.create()

    ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await productFacade.checkStock({productId: '1'})


    expect(result).toBeDefined();
    expect(result.productId).toBe("1");
    expect(result.stock).toBe(10);
  })

})