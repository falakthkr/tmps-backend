const { getTemplatePreview } = require("./templateController");
const httpMocks = require("node-mocks-http");

describe("getTemplatePreview", () => {
  const createRequest = (body) =>
    httpMocks.createRequest({ method: "POST", body });
  const createResponse = () => httpMocks.createResponse();

  test("check for correct template response", () => {
    const req = createRequest({
      username: "Something",
      orderId: "12345",
      amount: 12333,
      address: "123 Street, Bengaluru, India",
      trackLink: "https://something.com/track",
    });
    const res = createResponse();

    getTemplatePreview(req, res);

    const data = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(data.template).toBe(
      "Hello Something, your order 12345 is confirmed for ₹12333. We'll deliver it to 123 Street, Bengaluru, India. Track your order here: https://something.com/track"
    );
  });

  test("username missing", () => {
    const req = createRequest({
      orderId: "12345",
      amount: 12333,
      address: "123 Street, Bengaluru, India",
      trackLink: "https://something.com/track",
    });
    const res = createResponse();

    getTemplatePreview(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toBe('"username" is required');
  });

  test("amount is not a number", () => {
    const req = createRequest({
      username: "Something",
      orderId: "12345",
      amount: "12333",
      address: "123 Street, Bengaluru, India",
      trackLink: "https://something.com/track",
    });
    const res = createResponse();

    getTemplatePreview(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toBe('"amount" must be a number');
  });

  test("invalid URL", () => {
    const req = createRequest({
      username: "Something",
      orderId: "12345",
      amount: 12333,
      address: "123 Street, Bengaluru, India",
      trackLink: "something",
    });
    const res = createResponse();

    getTemplatePreview(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toBe('"trackLink" must be a valid URI');
  });

  test("edge case", () => {
    const req = createRequest(null); // Simulate invalid request body
    const res = createResponse();

    // Force an unexpected error by mocking `req.body`
    req.body = undefined;

    getTemplatePreview(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toBeDefined();
  });
});
