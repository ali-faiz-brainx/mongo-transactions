#!/bin/bash

# Set the base URL of your API
BASE_URL="http://localhost:5000/api"  # Adjust this to your actual API URL

# Function to place an order
place_order() {
    local endpoint=$1
    local product_id=$2
    local quantity=$3
    
    curl -X POST "${BASE_URL}${endpoint}" \
         -H "Content-Type: application/json" \
         -d "{\"productId\": \"${product_id}\", \"quantity\": ${quantity}}" \
         -s -o /dev/null -w "%{http_code}\n"
}

# Function to run concurrent orders
run_concurrent_orders() {
    local endpoint=$1
    local product_id=$2
    local quantity=$3
    local num_requests=$4

    echo "Testing ${endpoint} with ${num_requests} concurrent requests..."
    for i in $(seq 1 ${num_requests}); do
        place_order "${endpoint}" "${product_id}" "${quantity}" &
    done
    wait
    echo "Finished testing ${endpoint}"
}

# Main script
echo "Starting race condition test"

# Replace with an actual product ID from your database
PRODUCT_ID="66dee1e29a9cdf611e027535"
QUANTITY=1
NUM_REQUESTS=2

# Test without transaction
run_concurrent_orders "/order-no-transaction" "${PRODUCT_ID}" "${QUANTITY}" "${NUM_REQUESTS}"

# Add a delay between tests
# sleep 2

# Test with transaction
# run_concurrent_orders "/order-with-transaction" "${PRODUCT_ID}" "${QUANTITY}" "${NUM_REQUESTS}"

echo "Race condition test completed"
