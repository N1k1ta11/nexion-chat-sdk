"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatComponent = void 0;
// Простой компонент без типизации React
const LicenseService_1 = __importDefault(require("../services/LicenseService"));
const ChatComponent = ({ apiKey, theme = 'light', userId }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [currentPlan, setCurrentPlan] = useState('checking...');
    const [features, setFeatures] = useState([]);
    useEffect(() => {
        const initChat = () => __awaiter(void 0, void 0, void 0, function* () {
            LicenseService_1.default.setApiKey(apiKey);
            const licenseInfo = yield LicenseService_1.default.validateLicense(apiKey);
            if (!licenseInfo.is_active) {
                alert('Invalid or inactive license key.');
                return;
            }
            setCurrentPlan(licenseInfo.plan);
            setFeatures(licenseInfo.features);
        });
        initChat();
    }, [apiKey]);
    const hasFeature = (featureName) => {
        return features.includes(featureName);
    };
    const sendMessage = () => {
        if (inputText.trim() === '')
            return;
        const newMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: userId,
            timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputText('');
    };
    const renderMessageItem = ({ item }) => (<View style={styles.messageBubble}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>
        {item.timestamp.toLocaleTimeString()}
      </Text>
    </View>);
    return (<KeyboardAvoidingView style={[styles.container, theme === 'dark' ? styles.darkTheme : styles.lightTheme]}>
      <View style={styles.licenseBadge}>
        <Text style={styles.licenseText}>Plan: {currentPlan}</Text>
      </View>

      <FlatList data={messages} renderItem={renderMessageItem} keyExtractor={item => item.id} style={styles.messagesList}/>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Type a message..." value={inputText} onChangeText={setInputText} placeholderTextColor="#999"/>

        {hasFeature('voice_messages') && (<TouchableOpacity style={styles.voiceButton}>
            <Text>🎤</Text>
          </TouchableOpacity>)}

        {hasFeature('nft_preview') && inputText.includes('[NFT]') && (<TouchableOpacity style={styles.nftButton}>
            <Text>🖼️</Text>
          </TouchableOpacity>)}

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>);
};
exports.ChatComponent = ChatComponent;
const styles = {
    container: { flex: 1, padding: 10 },
    darkTheme: { backgroundColor: '#1a1a1a' },
    lightTheme: { backgroundColor: '#f5f5f5' },
    licenseBadge: {
        padding: 5,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 10
    },
    licenseText: { color: 'white', fontSize: 12 },
    messagesList: { flex: 1 },
    messageBubble: {
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 15,
        marginVertical: 5,
        maxWidth: '80%',
        alignSelf: 'flex-start'
    },
    messageText: { color: 'white' },
    messageTime: { color: 'rgba(255,255,255,0.7)', fontSize: 10 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        padding: 10,
        marginRight: 10
    },
    voiceButton: { padding: 10 },
    nftButton: { padding: 10 },
    sendButton: {
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 20
    }
};
