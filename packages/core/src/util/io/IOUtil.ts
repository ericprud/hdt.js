import ProgressListener from "@hdtjs/api";
import { Readable } from "stream";

export default class IOUtil {
    // private IOUtil() {}
    /*
    public static Readable getFileReadable(String fileName) throws IOException {
        Readable input;
        String name = fileName.toLowerCase();
        if(name.startsWith("http:/") || name.startsWith("ftp:/")) {
            URL url = new URL(fileName);
            URLConnection con = url.openConnection();
            con.connect();
            input = con.getReadable();
        } else if(name.equals("-")) {
            input = new BufferedReadable(System.in);
        } else {
            input = new BufferedReadable(new FileReadable(fileName));
        }
	
        if(name.endsWith(".gz")||name.endsWith(".tgz")) {
            input = new GZIPReadable(input);
        } else if(name.endsWith("bz2") || name.endsWith("bz")) {	
            input = new BZip2CompressorReadable(input, true);
        } else if(name.endsWith("xz")) {	
            input = new XZCompressorReadable(input, true);
        }
        return input;
    }

    public static BufferedReader getFileReader(String fileName) throws IOException {
        return new BufferedReader(new ReadableReader(getFileReadable(fileName)));
    }
*/

    static readLine(inp: Readable, character: number): string {
        const out = [];
        while (true) {
            const c = inp.read();
            if (c == -1) {
                throw Error('EOFException');
            }
            if (c == character) {
                break;
            }
            out.push(String.fromCharCode(c));
        }
        return out.join(''); // Uses default encoding
    }

    static readChars(inp: Readable, numChars: number): string {
        const out = [];
        for (let i = 0; i < numChars; i++) {
            const c = inp.read();
            if (c === -1) {
                throw Error('EOF');
            }
            out[i] = String.fromCharCode(c);
        }
        return out.join('');
    }

    /*
        public static void writeString(Writable out, String str) throws IOException {
            out.write(str.getBytes(ByteStringUtil.STRING_ENCODING));
        }
    
        public static void writeBuffer(Writable output, byte [] buffer, int offset, int length, ProgressListener listener) throws IOException {
            // FIXME: Do by blocks and notify listener
            output.write(buffer, offset, length);
        }
    
        // Copy the remaining of the Stream in, to out.
        public static void copyStream(Readable in, Writable out) throws IOException {
            byte[] buffer = new byte[1024*1024];
            int len;
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);
            }
        }
    
        // Copy the remaining of the Stream in, to out. Limit to n bytes.
        public static void copyStream(Readable in, Writable out, long n) throws IOException {
            byte[] buffer = new byte[1024*1024];
            int len=(int) (buffer.length < n ? buffer.length : n);
            long total=0;
    
            while ((total<n) && (len = in.read(buffer, 0, len)) != -1 ) {
                out.write(buffer, 0, len );
    
                total+=len;
                len = (int) (total+buffer.length>n ? n-total : buffer.length);
            }
        }
    
        public static void copyFile(File src, File dst) throws IOException {
            FileReadable in = new FileReadable(src);
            FileWritable out = new FileWritable(dst);
            try {
                copyStream(in, out);
            } finally {
                closeQuietly(in);
                closeQuietly(out);
            }
        }
    
        public static void moveFile(File src, File dst) throws IOException {
            copyFile(src, dst);
            src.delete();
        }
    
        public static void decompressGzip(File src, File trgt) throws IOException {
            Readable in = new GZIPReadable(new BufferedReadable(new FileReadable(src)));
            try {
                Writable out = new BufferedWritable(new FileWritable(trgt));
    
                try {
                    copyStream(in, out);
                } finally {
                    out.close();
                }
            }finally {
                in.close();
            }
        }
    
        /**
         * Write long, little endian
         * @param output
         * @param value
         * @throws IOException
         * /
        public static void writeLong(Writable output, long value) throws IOException {
            byte[] writeBuffer = new byte[8];
            writeBuffer[7] = (byte)(value >>> 56);
            writeBuffer[6] = (byte)(value >>> 48);
            writeBuffer[5] = (byte)(value >>> 40);
            writeBuffer[4] = (byte)(value >>> 32);
            writeBuffer[3] = (byte)(value >>> 24);
            writeBuffer[2] = (byte)(value >>> 16);
            writeBuffer[1] = (byte)(value >>>  8);
            writeBuffer[0] = (byte)(value);
            output.write(writeBuffer, 0, 8);
        }
    
    
        /**
         * Read long, little endian.
         * @param input
         * @return
         * @throws IOException
         * /
        public static long readLong(Readable input) throws IOException {
            int n = 0;
            byte[] readBuffer = new byte[8];
            while (n < 8) {
                int count = input.read(readBuffer, n , 8-n);
                if (count < 0)
                    throw new EOFException();
                n += count;
            }
    
            return   ((long)readBuffer[7] << 56) +
                ((long)(readBuffer[6] & 255) << 48) +
                ((long)(readBuffer[5] & 255) << 40) +
                ((long)(readBuffer[4] & 255) << 32) +
                ((long)(readBuffer[3] & 255) << 24) +
                ((readBuffer[2] & 255) << 16) +
                ((readBuffer[1] & 255) <<  8) +
                ((readBuffer[0] & 255)
                );
        }
    
        /**
         * Write int, little endian
         * @param output
         * @param value
         * @throws IOException
         * /
        public static void writeInt(Writable output, int value) throws IOException {
            byte[] writeBuffer = new byte[4];
            writeBuffer[0] = (byte) (value & 0xFF);
            writeBuffer[1] = (byte) ((value>>8) & 0xFF);
            writeBuffer[2] = (byte) ((value>>16) & 0xFF);
            writeBuffer[3] = (byte) ((value>>24) & 0xFF);
            output.write(writeBuffer,0,4);
        }
    
        /**
         * Convert int to byte array, little endian
         * /
        public static byte[] intToByteArray(int value) {
            byte[] writeBuffer = new byte[4];
            writeBuffer[0] = (byte) (value & 0xFF);
            writeBuffer[1] = (byte) ((value>>8) & 0xFF);
            writeBuffer[2] = (byte) ((value>>16) & 0xFF);
            writeBuffer[3] = (byte) ((value>>24) & 0xFF);
            return writeBuffer;
        }
    
        /**
         * Read int, little endian
         * @param in input
         * @return integer
         * @throws IOException
         * /
        public static int readInt(Readable in) throws IOException {
            int ch1 = in.read();
            int ch2 = in.read();
            int ch3 = in.read();
            int ch4 = in.read();
            if ((ch1 | ch2 | ch3 | ch4) < 0)
                throw new EOFException();
            return (ch4 << 24) + (ch3 << 16) + (ch2 << 8) + (ch1 << 0);
        }
    
        /**
         * Convert byte array to int, little endian
         * @param value
         * @return
         * /
        public static int byteArrayToInt(byte[] value){
            return (value[3] << 24) + (value[2] << 16) + (value[1] << 8) + (value[0] << 0);
        }
        */
    /**
     * @param input din
     * @param length bytes
     * @param listener
     * @return
     */
    static readBuffer(input: Readable, length: number, /* listener: ProgressListener */): number[] {
        const ret = [...input.read(length)];
        // TODO: Notify progress listener
        if (ret.length !== length)
            throw Error('IOException("EOF while reading array from Readable")');

        return ret;
    }
    /*
        public static CharSequence toBinaryString(long val) {
            StringBuilder str = new StringBuilder(64);
            int bits = 64;
            while(bits-- != 0) {
                str.append(((val>>>bits) & 1) !=0 ? '1' : '0');
            }
            return str;
        }
    
        public static CharSequence toBinaryString(int val) {
            StringBuilder str = new StringBuilder(32);
            int bits = 32;
            while(bits-- != 0) {
                str.append(((val>>>bits) & 1) !=0 ? '1' : '0');
            }
            return str;
        }
    
        public static void printBitsln(long val, int bits) {
            printBits(val, bits);
            System.out.println();
        }
    
        public static void printBits(long val, int bits) {
            while(bits-- != 0) {
                System.out.print( ((val>>>bits) & 1) !=0 ? '1' : '0');
            }
        }
    
        public static short readShort(Readable in) throws IOException {
            int ch1 = in.read();
            int ch2 = in.read();
    
            if ((ch1 | ch2) < 0) {
                throw new EOFException();
            }
    
            return (short)((ch2 << 8) + (ch1));
        }
    
        public static void writeShort(Writable out, short value) throws IOException {
            out.write(value & 0xFF);
            out.write((value >> 8) & 0xFF);
        }
    */

    static readByte(inp: Readable): number {
        const b: number = inp.read();
        if (b < 0) {
            throw new Error('EOFException');
        }
        return b & 0xFF;
    }

    /*
        public static void writeByte(Writable out, byte value) throws IOException {
            out.write(value);
        }
    
        // Readable might not skip the specified number of bytes. This call makes multiple calls
        // if needed to ensure that the desired number of bytes is actually skipped.
        public static void skip(Readable in, long n) throws IOException {
            if(n==0) {
                return;
            }
    
            long totalSkipped = in.skip(n);
            while(totalSkipped<n) {
                totalSkipped += in.skip(n-totalSkipped);
            }
        }
    
        public static void closeQuietly(Closeable output) {
            if( output == null )
                return;
    
            try {
                output.close();
            } catch (IOException e) {
            }
        }
        */

}
