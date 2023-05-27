import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./algorithms.css"

const CanvasWithCircle = () => {
  const canvasRef = useRef(null);
  const canvasRefPath = useRef(null);
  const [circlePoint, setCirclePoint] = useState({ x: 30, y: 30, weight: 0 });
  const [randomPoints, setRandomPoints] = useState([]);
  const [shortestPath, setShortestPath] = useState([]);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [sortingInProgress, setSortingInProgress] = useState(false);

	
  // useLayoutEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   const canvas2 = canvasRefPath.current;
  //   const context2 = canvas.getContext("2d");

  //   // Clear the canvas
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   context2.clearRect(0, 0, canvas2.width, canvas2.height);



  //   // Rest of your code...
  // }, []);

  useEffect(() => {
		console.log('xd??')
		var img = new Image();
		img.src = "../../../public/assets/canvas2.jpg";
		console.log(img)

		// Define the function to handle image loading
		img.onload = function() {
			// Create a canvas element
			console.log('xd?')
			const canvas = canvasRef.current;
			canvas.width = img.width;
			canvas.height = img.height;
		
			// Get the 2D context of the canvas
			var context = canvas.getContext("2d");
		
			// Draw the image on the canvas
			context.drawImage(img, 0, 0);
		
			const x = 1;
			const y = 20;
			// Get the pixel data of the specified coordinates
			var pixelData = context.getImageData(x, y, 1, 1).data;
		
			// Extract the RGB values
			var r = pixelData[0];
			var g = pixelData[1];
			var b = pixelData[2];
		
			// Log the RGB values
			console.log("RGB values at (" + x + ", " + y + "): R=" + r + ", G=" + g + ", B=" + b);
		};
		
		// Set the source of the image
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.toDataURL("../../assets/canvas2");
    context.lineJoin = "round";
    context.lineCap = "round";
		

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the circle
    context.beginPath();
    context.arc(circlePoint.x, circlePoint.y, 10, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();
    context.closePath();

    // Draw the random points
    context.fillStyle = "blue";
    randomPoints.forEach((point) => {
      context.beginPath();
      context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
    });

    // Draw the animated path
    context.strokeStyle = "green";
    context.lineWidth = 2;
    context.beginPath();
    shortestPath.forEach((point, index) => {
      if (index === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    });
    context.stroke();
    context.closePath();

    // Draw the yellow lines for trying different points
    context.strokeStyle = "yellow";
    context.lineWidth = 1;
    context.beginPath();
    shortestPath.forEach((point, index) => {
      if (index >= animationIndex) {
        randomPoints.forEach((randomPoint) => {
          if (!shortestPath.includes(randomPoint)) {
            context.moveTo(point.x, point.y);
            context.lineTo(randomPoint.x, randomPoint.y);
          }
        });
      }
    });
    context.stroke();
    context.closePath();
  }, [circlePoint, randomPoints, shortestPath, animationIndex]);

  const handleCanvasClick = (event) => {
    if (sortingInProgress) {
      return;
    }

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const weight = Math.floor(Math.random() * 50);


    setCirclePoint({ x, y, weight });
  };

  useEffect(() => {
    const generateRandomPoints = () => {
      const points = [];
      const canvasWidth = 640;
      const canvasHeight = 640;
      const minDistance = 40;
      for (let i = 0; i < 10; i++) {
        while (true) {
          // Generate random coordinates for the point
          const x =
            Math.random() * (canvasWidth - 2 * minDistance) + minDistance;
          const y =
            Math.random() * (canvasHeight - 2 * minDistance) + minDistance;
          const weight = Math.floor(Math.random() * 50);

          // Check if the point violates the minimum distance constraint
          const closePoints = points.filter(
            (pos) =>
              Math.hypot(pos.x - x, pos.y - y) < minDistance ||
              x < minDistance ||
              x > canvasWidth - minDistance ||
              y < minDistance ||
              y > canvasHeight - minDistance
          );

          if (!closePoints.length) {
            // Add the point to the list
            points.push({ x, y, weight });
            break;
          }
        }
      }
      setRandomPoints(points);
    };

    generateRandomPoints();
  }, []);

  useEffect(() => {
    const calculateDistance = (point1, point2) => {
      const dx = point2.x - point1.x;
      const dy = point2.y - point1.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const calculateShortestPath = () => {
      const points = [circlePoint, ...randomPoints];
      const remainingPoints = [...points];
      const shortestPath = [remainingPoints.shift()];

      const animatePath = () => {
        let index = 0;
        const intervalId = setInterval(() => {
          if (remainingPoints.length === 0) {
            clearInterval(intervalId);
            setSortingInProgress(false);
            setShortestPath(shortestPath);
          } else {
            let shortestDistance = Infinity;
            let closestPoint = null;

            remainingPoints.forEach((point) => {
              const distance = calculateDistance(
                shortestPath[shortestPath.length - 1],
                point
              );

              if (distance < shortestDistance) {
                shortestDistance = distance;
                closestPoint = point;
              }
            });

            shortestPath.push(closestPoint);
            remainingPoints.splice(remainingPoints.indexOf(closestPoint), 1);
            setShortestPath([...shortestPath]);
            setAnimationIndex(index);
            index++;
          }
        }, 500);
      };

      setSortingInProgress(true);
      animatePath();
    };

    if (randomPoints.length > 0) {
      calculateShortestPath();
    }
  }, [circlePoint, randomPoints]);

  useEffect(() => {
    // Connect the points from the smallest weight path to the biggest
    if (randomPoints.length === 0) {
      return;
    }

    // Create a copy of randomPoints array
    const points = [...randomPoints, circlePoint];

    // Draw points and connect them using lines
    const canvas = canvasRefPath.current;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.imageSmoothingEnabled = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw points
    ctx.fillStyle = "blue";
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Display weight
      ctx.fillStyle = "black";
      ctx.fillText(point.weight.toString(), point.x + 5, point.y + 5);
    });

    // Custom sorting function with visualization
    const customSort = async (arr, start, end) => {
      if (start >= end) {
        return;
      }

      // Find the index of the pivot element
      const pivotIndex = await partition(arr, start, end);

      // Recursive calls on left and right partitions
      await customSort(arr, start, pivotIndex - 1);
      await customSort(arr, pivotIndex + 1, end);
    };

    // Partition function for quicksort
    const partition = async (arr, start, end) => {
      const pivot = arr[end].weight;
      let i = start - 1;

      for (let j = start; j < end; j++) {
        // Draw yellow path for comparison
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(arr[j].x, arr[j].y);
        ctx.lineTo(arr[end].x, arr[end].y);
        ctx.stroke();

        // Delay for visualization
        await delay(100);

        if (arr[j].weight < pivot) {
          i++;

          // Swap elements
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }

      // Swap pivot with the element at i+1
      const temp = arr[i + 1];
      arr[i + 1] = arr[end];
      arr[end] = temp;

      // Remove yellow path after comparison
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw points
      ctx.fillStyle = "blue";
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Display weight
        ctx.fillStyle = "black";
        ctx.fillText(point.weight.toString(), point.x + 5, point.y + 5);
      });

      return i + 1;
    };

    // Delay function for visualization
    const delay = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    // Start the sorting process
    customSort(points, 0, points.length - 1)
      .then(() => {
        // Delay before drawing the red path
        return delay(100);
      })
      .then(() => {
        // Connect the points with a red path
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        // Function to connect points with delay
        const connectPointsWithDelay = async () => {
          for (let i = 1; i < points.length; i++) {
            const point = points[i];

            // Delay before connecting the next point
            await delay(500);

            ctx.lineTo(point.x, point.y);
            ctx.stroke();
          }
        };

        // Start connecting points with delay
        connectPointsWithDelay();
      });
  }, [randomPoints, circlePoint]);

  const parentStyle = {
    position: "relative",
		width:"640px",
		height: "640px"
  };

  const canvasStyle = {
    position: "absolute",
    top: 0,
    left: 0,
  };
	const canvasStyle2 = {
    position: "absolute",
    top: 0,
    left: 640,
		border: "1px solid black"
  };

  return (
    <div>
      {/* <div>
        <canvas
          ref={canvasRef}
          width={640}
          height={640}
          style={canvasStyle}
          onClick={handleCanvasClick}
        />
      </div> */}
			<div>
				<div style={parentStyle}>
					<div className="image"></div>
					<canvas
						ref={canvasRef}
						width={640}
						height={640}
						style={canvasStyle}
						onClick={handleCanvasClick}
					/>
				</div>
				<canvas
          ref={canvasRefPath}
          width={640}
          height={640}
          style={canvasStyle2}
        />
			</div>
    </div>
  );
};

export default CanvasWithCircle;
