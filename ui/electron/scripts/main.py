import cv2
import easyocr
import threading, queue

class VideoCapture:

  def __init__(self, name):
    self.cap = cv2.VideoCapture(name)
    self.q = queue.Queue()
    t = threading.Thread(target=self._reader)
    t.daemon = True
    t.start()

  def _reader(self):
    while True:
      ret, frame = self.cap.read()
      if not ret:
        break
      if not self.q.empty():
        try:
          self.q.get_nowait()  
        except queue.Empty:
          pass
      self.q.put(frame)

  def read(self):
    return self.q.get()


def open_img(img_path):
    carplate_img = cv2.imread(img_path)
    carplate_img = cv2.cvtColor(carplate_img, cv2.COLOR_BGR2RGB)
    return carplate_img


def carplate_extract(image, carplate_haar_cascade):
    carplate_rects = carplate_haar_cascade.detectMultiScale(image, scaleFactor=1.1, minNeighbors=5)
    for x, y, w, h in carplate_rects:
        carplate_img = image[y+15:y+h-10, x+15:x+w-20]
    return carplate_img


def enlarge_img(image, scale_percent):
    width = int(image.shape[1] * scale_percent / 100)
    height = int(image.shape[0] * scale_percent / 100)
    dim = (width, height)
    resized_image = cv2.resize(image, dim, interpolation = cv2.INTER_AREA)
    return resized_image

def main():
    cap = VideoCapture("http://127.0.0.1:5000/video_feed")
    reader = easyocr.Reader(['en'], gpu=False, verbose=False)
    while True: 
        frame = cap.read()
        
        carplate_img_rgb = frame
        carplate_haar_cascade = cv2.CascadeClassifier('C:/projects/car_plate_detection/ui/electron/scripts/haar_cascades/haarcascade_plate_number.xml')

        carplate_extract_img = carplate_extract(carplate_img_rgb, carplate_haar_cascade)
        carplate_extract_img = enlarge_img(carplate_extract_img, 150)

        gray = cv2.cvtColor(carplate_extract_img, cv2.COLOR_BGR2GRAY)
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
        result = reader.readtext(thresh, detail=0, allowlist='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        print(result, flush=True)


if __name__ == '__main__':
    main()
